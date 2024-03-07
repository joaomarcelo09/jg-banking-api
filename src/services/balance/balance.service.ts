import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) { }

  async create(tx) {
    const prisma = tx ?? this.prisma
    const balance = await prisma.balance.create({
      data: {
        value: 0,
      },
    });

    return balance;
  }

  async deposit(id, value, id_user, amount_sent) {

    const upBalance = await this.prisma.balance.update({
      where: {
        id_balance: id
      },
      data: {
        value: value
      }
    })

    await this.prisma.deposit_record.create({
      data: {
        id_deposit_user: id_user,
        deposit_amount: amount_sent
      }
    })

    return upBalance;
  }

  async withdraw(id, value, id_user, amount_sent) {

    const upBalance = await this.prisma.balance.update({
      where: {
        id_balance: id
      },
      data: {
        value: value
      }
    })

    await this.prisma.withdrawal_record.create({
      data: {
        id_withdrawal_user: id_user,
        withdrawal_amount: amount_sent
      }
    })

    return upBalance;
  }

  async transfer(sender, recipient, value) {

    await this.prisma.$transaction(async (x) => {

      await this.prisma.balance.update({
        where: {
          id_balance: sender.id_balance
        },
        data: {
          value: sender.value
        }
      })

      await this.prisma.balance.update({
        where: {
          id_balance: recipient.id_balance
        },
        data: {
          value: recipient.value
        }
      })

      await this.prisma.pix_transaction.create({
        data: {
          amount_sent: value,
          id_pix_recipient: recipient.id_user,
          id_pix_sender: sender.id_user
        }
      })

    }, {
      timeout: 20000
    })

    return true

  }
}
