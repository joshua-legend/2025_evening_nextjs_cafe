import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignupDto) {
    const user = await this.authService.signUp(signUpDto);
    return { data: user, message: '회원가입 성공' };
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.login(loginDto);

    // Refresh Token을 httpOnly 쿠키에 설정
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // 클라이언트 JS에서 접근 불가 → XSS 방어
      sameSite: 'lax', // CSRF 공격 방어: 타 도메인 요청에 쿠키 미전송
      maxAge: 60 * 1000, // 쿠키 수명: 7일 (밀리초 단위)
    });

    return { data: { accessToken, username: user.name }, message: '로그인 성공' };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    await this.tokenService.revokeRefreshToken(refreshToken);
    res.clearCookie('refreshToken');
    return { data: null, message: '로그아웃 성공' };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard) // ① 쿠키의 리프레시 토큰 서명 검증
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response, // ② 쿠키 재설정 위해 passthrough
  ) {
    try {
      // 1) 기존 쿠키에서 토큰 추출
      const oldToken = req.cookies['refreshToken'];
      console.log('▶ refresh oldToken:', oldToken);
      // 2) 서비스에서 유효성 검증 + 토큰 회전(이전 토큰 폐기 + 새 토큰 발급)
      const user = await this.authService.getUserByRefreshToken(oldToken);
      const { accessToken, refreshToken } = await this.authService.renewRefreshTokens(oldToken);
      // 3) 새 리프레시 토큰을 httpOnly 쿠키에 설정
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // JS 접근 차단 → XSS 방어
        sameSite: 'lax', // CSRF 방어
        maxAge: 60 * 1000, // 1분(테스트용)
      });

      // 4) 새 Access Token만 응답 바디로 반환
      return {
        data: { accessToken, username: user.name },
        message: '토큰 재발급 성공',
      };
    } catch (error) {
      console.error('🔴 refresh error:', error);
      throw new UnauthorizedException('토큰 재발급 실패');
    }
  }
}
