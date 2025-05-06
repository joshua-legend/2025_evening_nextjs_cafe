import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './services/token.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken, User])],
  controllers: [AuthController],
  providers: [AuthService, TokenService, UsersService, JwtService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
