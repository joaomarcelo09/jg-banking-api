import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tx) {
    const prisma = tx ?? this.prisma
    const balance = await prisma.balance.create({
      data: {
        value: 0,
      },
    });

    return balance;
  }
}
