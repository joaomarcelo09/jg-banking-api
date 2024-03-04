import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PeopleService {
    constructor(private readonly prisma: PrismaService) {}

  async create(body, tx) {
    const prisma = tx ?? this.prisma
    const people = await prisma.people.create({
      data: {
        name: body.name,
      },
    });

    return people;
  }
}
