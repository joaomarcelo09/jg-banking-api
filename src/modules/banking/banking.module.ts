import { Module } from '@nestjs/common';
import { BankingService } from './banking.service';
import { BankingController } from './banking.controller';
import { BalanceService } from 'src/services/balance/balance.service';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersService } from '../users/users.service';
import { PeopleService } from 'src/services/people/people.service';

@Module({
  imports: [PrismaModule],
  controllers: [BankingController],
  providers: [BankingService, BalanceService, UsersService, PeopleService],
})
export class BankingModule {}
