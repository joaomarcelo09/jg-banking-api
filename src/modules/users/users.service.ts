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

        const user = await tx.users.create({
          data: {
            id_people: people.id_people,
            id_balance: balance.id_balance,
            password: data.password
          }
        })

        return {user, people, balance}
        })

    return user;
  }

  async findOne(where?, select?) {
    const findUser = await this.prisma.users.findFirst({where, select})
    return findUser;
  }

  async update(id: number, data: any) {

    const upUser = await this.prisma.users.update({
      where: {
        id_user: id
      },
      data: {
        password: data.password,
        people: {
          update: {
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            telephone: data.telephone,
            date_birth: data.date_birth
          }
        }
      }
    })

    return upUser;
  }

  async remove(data: any, id: number) {

    const request = await this.prisma.$transaction(async (x) => {

      data.before.map(async (x) => {
         await this.prisma.pix_key.delete({
          where: {
            id_pix_key: x
          }
         })
      })
  
      await this.prisma.users.delete({
        where: {
          id_user: id
        },
        select: {
          balance: true,
          pix_key: true,
          people: true
        }
      })
  
      await this.prisma.balance.delete({
        where: {
          id_balance: data.after.balance.id_balance
        }
      })
  
      await this.prisma.people.delete({
        where: {
          id_people: data.after.people.id_people
        }
      })

      return

    }, {
      timeout: 20000
    }) 

    return request;
  }
}
