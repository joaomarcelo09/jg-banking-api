import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BalanceService } from 'src/services/balance/balance.service';
import { PeopleService } from 'src/services/people/people.service';


@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly balance: BalanceService,
    private readonly people: PeopleService,
  ) { }

  async create(data) {

      const user = await this.prisma.$transaction(async (tx) => {

        const balance = await this.balance.create(tx)
        const people = await this.people.create(data.people, tx)

        const user = await this.prisma.users.create({
          data: {
            id_people: people.id_people,
            id_balance: balance.id_balance,
            password: data.password
          }
        })

        return user
        })

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
