import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { BalanceService } from 'src/services/balance/balance.service';
import { PeopleService } from 'src/services/people/people.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, BalanceService, PeopleService],
})
export class UsersModule {}
