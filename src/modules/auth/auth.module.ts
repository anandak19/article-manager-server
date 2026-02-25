import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AUTH_TOKENS } from './auth.tokens';
import { CacheModule } from '@core/lib/cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [{ provide: AUTH_TOKENS.AUTH_SERVICE, useClass: AuthService }],
  controllers: [AuthController],
})
export class AuthModule {}
