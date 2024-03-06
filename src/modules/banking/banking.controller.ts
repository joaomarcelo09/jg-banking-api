import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { BankingService } from './banking.service';
import { DepositBankingDto } from './dto/deposit-dto';
import { BalanceService } from 'src/services/balance/balance.service';
import { WithdrawBankingDto } from './dto/withdraw-dto';
import { UsersService } from '../users/users.service';

@Controller('banking')
export class BankingController {
  constructor(private readonly balance: BalanceService, private readonly user: UsersService) { }

  @Patch('/deposit')
  async deposit(@Body() body: DepositBankingDto, @Req() req) {

    const where = {
      id_user: req.user.id_user
    }

    const select = {
      balance: {
        select: {
          id_balance: true,
          value: true
        }
      }
    }

    const user: any = await this.user.findOne(where, select)
    const value = user.balance.value + body.value

    return await this.balance.deposit(user.balance.id_balance, value);

  }

  @Patch('/withdraw')
  async withdraw(@Body() body: WithdrawBankingDto, @Req() req) {

    const where = {
      id_user: req.user.id_user
    }

    const select = {
      balance: {
        select: {
          id_balance: true,
          value: true
        }
      }
    }

    const user: any = await this.user.findOne(where, select)
    const value = user.balance.value - body.value

    if(value < 0) throw new HttpException('Saldo insuficiente', HttpStatus.BAD_REQUEST)

    return await this.balance.withdraw(user.balance.id_balance, value);

  }

}
