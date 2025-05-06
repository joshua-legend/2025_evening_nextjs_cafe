import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { parseMS } from 'src/common/utils/parser';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async generateAccessToken(user: User) {
    const payload = { sub: user.id, username: user.name };
    return this.jwtService.sign(payload, { expiresIn: '1m', secret: 'lemon' });
  }

  async generateRefreshToken(user: User) {
    const payload = { sub: user.id, username: user.name };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '2m', secret: 'lemon' });
    const expiresAt = new Date(Date.now() + parseMS('2m'));
    await this.refreshTokenRepository.save({ token: refreshToken, expiresAt, user });
    return refreshToken;
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verify(token);
  }

  async verifyRefreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: 'lemon' });
      const storedToken = await this.refreshTokenRepository.findOneBy({ token });
      if (!storedToken) {
        throw new UnauthorizedException('리프레시 토큰을 찾을 수 없습니다');
      }
      if (storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('리프레시 토큰이 만료되었습니다');
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다');
    }
  }

  // 4) Refresh Token 폐기
  async revokeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ token });
  }
}
