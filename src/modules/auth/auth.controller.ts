import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { comparePassword } from 'src/helpers/password/password';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly user: UsersService) {
  }

  @Post()
  async login(@Body() body) {

    const where = {
      people: {
        email: body.email
      }
    }

    const user = await this.user.findOne(where)

    const compare = comparePassword(body.password, user.password)

    if(!compare) throw new HttpException('Senhas não coincidem', HttpStatus.UNAUTHORIZED) 

    return compare
  }
}

