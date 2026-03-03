import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@core/lib/cache/cache.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseOption } from '@config/database/database.options';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ArticlesModule,
    CacheModule,
    MongooseModule.forRootAsync(mongooseOption),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
