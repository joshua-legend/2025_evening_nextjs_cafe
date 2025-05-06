// jwt-refresh.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    if (info?.name === 'TokenExpiredError') throw new UnauthorizedException('Refresh 토큰이 만료되었습니다.');
    if (err || !user) throw err || new UnauthorizedException('Refresh 토큰이 유효하지 않습니다.');
    return user;
  }
}
