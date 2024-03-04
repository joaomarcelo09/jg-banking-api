import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaModule } from 'src/database/prisma.module';
import { BalanceService } from 'src/services/balance/balance.service';
import { PeopleService } from 'src/services/people/people.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, BalanceService, PeopleService],
})
export class AuthModule {}
