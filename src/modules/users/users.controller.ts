import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashPassword } from 'src/helpers/password/password';
import { SkipAuth } from '../auth/auth.decorator';
import { validateCPF } from 'src/helpers/valid/valid-cpf';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

    const existEmail = await this.usersService.findOne(whereEmail)
    const existCpf = await this.usersService.findOne(whereCpf)
    const validCpf = await validateCPF(body.people.cpf)

    if(existEmail || existCpf)  throw new HttpException(`${existEmail ? 'Email existente' : 'Cpf existente'}`, HttpStatus.BAD_REQUEST)
    if(!validCpf) throw new HttpException('Cpf inválido', HttpStatus.BAD_REQUEST)

    const user = await this.usersService.create(data)
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
