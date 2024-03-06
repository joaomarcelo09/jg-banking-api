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

    const {balance} = await this.prisma.users.findFirst({
      where: {
        id_user: id
      },
      select: {
        balance: {
          select: {
            id_balance: true,
            value: true
          }
        }
      }
    })

    const upBalance = await this.prisma.balance.update({
      where: {
        id_balance: balance.id_balance
      },
      data: {
        value: balance.value + value
      }
    })

    return upBalance;
  }

  async withdraw(id, value) {

    const {balance} = await this.prisma.users.findFirst({
      where: {
        id_user: id
      },
      select: {
        balance: {
          select: {
            id_balance: true,
            value: true
          }
        }
      }
    })

    const upBalance = await this.prisma.balance.update({
      where: {
        id_balance: balance.id_balance
      },
      data: {
        value: balance.value - value
      }
    })

    return upBalance;
  }
}
