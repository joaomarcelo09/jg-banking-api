import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { comparePassword } from 'src/helpers/password/password';
import { JwtService } from '@nestjs/jwt';
import { SkipAuth } from './auth.decorator';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly user: UsersService, private readonly jwt: JwtService) {
  }

  @SkipAuth()
  @Post()
  async login(@Body() body: LoginDto) {

    const where = {
      people: {
        email: body.email
      }
    }

    const select = {
      id_user: true,
      password: true,
      people: {
        select: {
          name: true
        }
      }
    }

    const user: any = await this.user.findOne(where, select)

    const compare = comparePassword(body.password, user.password)
    if(!compare) throw new HttpException('Senhas não coincidem', HttpStatus.UNAUTHORIZED) 

    const payload = {
      id_user: user.id_user,
      username: user.people.name
    }

    return {
      payload,
      access_token: await this.jwt.signAsync(payload)
    }
  }
}

