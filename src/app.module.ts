import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BalanceService } from './balance/services/balance/balance.service';
import { BalanceService } from './services/balance/balance.service';
import { PeopleService } from './services/people/people.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, BalanceService, PeopleService],
})
export class AppModule {}
