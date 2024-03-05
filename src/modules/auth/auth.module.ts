import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaModule } from 'src/database/prisma.module';
import { BalanceService } from 'src/services/balance/balance.service';
import { PeopleService } from 'src/services/people/people.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [PrismaModule,
    JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '480s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, UsersService, BalanceService, PeopleService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AuthModule { }
