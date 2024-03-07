import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashPassword } from 'src/helpers/password/password';
import { SkipAuth } from '../auth/auth.decorator';
import { validateCPF } from 'src/helpers/valid/valid-cpf';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { excludeRelations } from 'src/helpers/relations/excludeRelations';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @SkipAuth()
  @Post()
  async create(@Body() body: CreateUserDto) {

    const data = {
      password: await HashPassword(body.password),
      people: body.people
    }

    const whereEmail = {
      people: {
        email: body.people.email
      }
    }

    const whereCpf = {
      people: {
        cpf: body.people.cpf
      }
    }

    const whereTelephone = {
      people: {
        telephone: body.people.telephone
      }
    }

    const existEmail = await this.usersService.findOne(whereEmail)
    const existCpf = await this.usersService.findOne(whereCpf)
    const existTelephone = await this.usersService.findOne(whereTelephone)
    const validCpf = await validateCPF(body.people.cpf)

    if (existEmail || existCpf || existTelephone)
      throw new HttpException(`${existEmail ? 'Email existente' : existCpf ? 'Cpf existente' : 'Telefone existente'}`,
        HttpStatus.BAD_REQUEST)
    if (!validCpf) throw new HttpException('Cpf inválido', HttpStatus.BAD_REQUEST)

    const user = await this.usersService.create(data)
    return user;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    const where = {
      id_user: +id
    }
    return this.usersService.findOne(where);
  }

  @Patch('')
  async update(@Body() body: UpdateUserDto, @Req() req) {
    const id = req.user.id_user
    const data = {

      password: await HashPassword(body.password),
      people: {
        email: body.people.email,
        telephone: body.people.telephone,
        date_birth: body.people.date_birth,
        name: body.people.name

      }

    }

    const whereEmail = {
      people: {
        email: body.people.email
      }
    }

    const existEmail = await this.usersService.findOne(whereEmail)

    if (existEmail) throw new HttpException('Email existente', HttpStatus.BAD_REQUEST)


    return this.usersService.update(id, data);
  }

  @Delete()
  async remove(@Req() req) {

    const id = req.user.id_user
    const relationsBefore = ['pix_key']
    const relationsAfter = ['balance', 'people']

    let exclude = await excludeRelations(id, relationsBefore, relationsAfter)

    exclude.before = exclude.before.pix_key.map((x) => x.id_pix_key)

    return await this.usersService.remove(exclude, id);
  }
}
