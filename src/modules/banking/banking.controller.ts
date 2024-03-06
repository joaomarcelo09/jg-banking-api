import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BankingService } from './banking.service';
import { DepositBankingDto } from './dto/deposit-dto';
import { BalanceService } from 'src/services/balance/balance.service';
import { WithdrawBankingDto } from './dto/withdraw-dto';

@Controller('banking')
export class BankingController {
  constructor(private readonly bankingService: BankingService, private readonly balance: BalanceService) {}

  @Patch('/deposit')
  async deposit(@Body() body: DepositBankingDto, @Req() req) {

    return await this.balance.deposit(req.user.id_user, body.value);

  }

  @Patch('/withdraw')
  async withdraw(@Body() body: WithdrawBankingDto, @Req() req) {

    return await this.balance.withdraw(req.user.id_user, body.value);

  }

}
