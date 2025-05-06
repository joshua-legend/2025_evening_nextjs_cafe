import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly usersService: UsersService) {
    super({
      // 쿠키에서 'refreshToken'이라는 이름의 값을 꺼내도록 설정
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'lemon', // Refresh Token용 secret (실제론 다른 값으로 분리)
    });
  }

  async validate(payload: any) {
    // payload.sub → user.id
    const user = await this.usersService.findOne(payload.sub);
    // 이 값이 req.user에 담깁니다.
    if (!user) throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    return { userId: user.id };
  }
}
