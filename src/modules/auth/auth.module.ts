import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AUTH_TOKENS } from './auth.tokens';
import { CacheModule } from '@core/lib/cache/cache.module';
import { OtpModule } from '@core/lib/otp/otp.module';
import { EmailModule } from '@core/lib/email/email.module';
import { UsersModule } from '@modules/users/users.module';
import { SignupService } from './services/signup/signup.service';

@Module({
  imports: [CacheModule, OtpModule, EmailModule, UsersModule],
  providers: [
    { provide: AUTH_TOKENS.AUTH_SERVICE, useClass: AuthService },
    { provide: AUTH_TOKENS.SIGNUP_SERVICE, useClass: SignupService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
