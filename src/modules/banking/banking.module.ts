import { Module } from '@nestjs/common';
import { BankingService } from './banking.service';
import { BankingController } from './banking.controller';
import { BalanceService } from 'src/services/balance/balance.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BankingController],
  providers: [BankingService, BalanceService],
})
export class BankingModule {}
