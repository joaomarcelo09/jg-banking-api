import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BalanceService } from './services/balance/balance.service';
import { PeopleService } from './services/people/people.service';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { BankingModule } from './modules/banking/banking.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, BankingModule],
  controllers: [AppController],
  providers: [AppService, BalanceService, PeopleService],
})
export class AppModule {}
