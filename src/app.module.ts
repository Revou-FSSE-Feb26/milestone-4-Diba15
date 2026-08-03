/**
 * Catatan:
 * - ThrottlerGuard digunakan untuk mengatur batasan akses
 * - ThrottlerModule digunakan untuk mengatur batasan akses
 * - APP_GUARD digunakan untuk mengatur batasan akses
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60 * 1000,
        limit: 100,
      },
    ]),
    UsersModule,
    TransactionsModule,
    AccountsModule,
    CategoriesModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // Method akan dipanggil otomatis ketika melakukan request
  configure(consumer: MiddlewareConsumer) {
    // Mengaktifkan Logging untuk semua route
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
