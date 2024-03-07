import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { BankingService } from './banking.service';
import { DepositBankingDto } from './dto/deposit-dto';
import { BalanceService } from 'src/services/balance/balance.service';
import { WithdrawBankingDto } from './dto/withdraw-dto';
import { UsersService } from '../users/users.service';
import { RegisterPixDto } from './dto/register-pix-dto';
import { MakePixDto } from './dto/make-pix-dto';
import { diffTypePix } from 'src/helpers/pix/registerPix';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Banking')
@Controller('banking')
export class BankingController {
  constructor(private readonly balance: BalanceService, private readonly banking: BankingService, private readonly user: UsersService) { }

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

    if (value < 0) throw new HttpException('Saldo insuficiente', HttpStatus.BAD_REQUEST)

    return await this.balance.withdraw(user.balance.id_balance, value);

  }

  @Post('/register-pix')
  async registerPix(@Body() body: RegisterPixDto, @Req() req) {



    const wherePix = {
      key_type: body.type,
      id_user: req.user.id_user
    }
    const existPix = await this.banking.findPix(wherePix)
    if (existPix) throw new HttpException('Pix do mesmo tipo existente', HttpStatus.BAD_REQUEST)

    const whereUser = {
      id_user: req.user.id_user
    }

    const selectUser = {
      people: {
        select: {
          email: true,
          telephone: true,
          cpf: true
        }
      }
    }
    const user = await this.user.findOne(whereUser, selectUser)

    const data = {
      key: await diffTypePix(body.type, user.people),
      type: body.type,
      user: req.user.id_user
    }
    return await this.banking.registerPix(data)

  }

  @Patch('/make-pix')
  async makePix(@Body() body: MakePixDto, @Req() req) {

    const wherePix = {
      key: body.key_pix
    }

    const selectPix = {
      users: {
        select: {
          id_user: true,
          balance: {
            select: {
              value: true,
              id_balance: true
            }
          }
        }
      }
    }
    const whereUser = {
      id_user: req.user.id_user
    }

    const selectUser = {
      id_user: true,
      balance: {
        select: {
          value: true,
          id_balance: true
        }
      }
    }

    const recipient: any = await this.banking.findPix(wherePix, selectPix)
    const sender: any = await this.user.findOne(whereUser, selectUser)

    if (!body.key_pix || !recipient) throw new HttpException('Pix inválido', HttpStatus.BAD_REQUEST)

    const valueSender = sender.balance.value - body.value
    const valueRecipient = recipient.users.balance.value + body.value

    if (valueSender < 0) throw new HttpException('Saldo insuficiente', HttpStatus.BAD_REQUEST)

    const dataSender = {
      id_sender: sender.balance.id_balance,
      value: valueSender
    }

    const dataRecipient = {
      id_recipient: recipient.users.balance.id_balance,
      value: valueRecipient
    }

    const extract = await this.balance.transfer(dataSender, dataRecipient)

    return { extract };

  }

}
