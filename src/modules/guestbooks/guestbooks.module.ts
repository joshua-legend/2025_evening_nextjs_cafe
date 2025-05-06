import { Module } from '@nestjs/common';
import { GuestbooksService } from './guestbooks.service';
import { GuestbooksController } from './guestbooks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guestbook } from './entities/guestbook.entity';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
@Module({
  imports: [TypeOrmModule.forFeature([Guestbook]), UsersModule],
  controllers: [GuestbooksController],
  providers: [GuestbooksService, JwtStrategy],
})
export class GuestbooksModule {}
