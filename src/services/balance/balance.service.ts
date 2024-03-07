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

  async deposit(id, value) {

    const upBalance = await this.prisma.balance.update({
      where: {
        id_balance: id
      },
      data: {
        value: value
      }
    })

    return upBalance;
  }

  async withdraw(id, value) {

    const upBalance = await this.prisma.balance.update({
      where: {
        id_balance: id
      },
      data: {
        value: value
      }
    })

    return upBalance;
  }

  async transfer(sender, recipient) {

    await this.prisma.balance.update({
      where: {
       id_balance: sender.id_sender
      },
      data: {
        value: sender.value
      }
    })

    await this.prisma.balance.update({
      where: {
       id_balance: recipient.id_recipient
      },
      data: {
        value: recipient.value
      }
    })

    return true

  }
}
