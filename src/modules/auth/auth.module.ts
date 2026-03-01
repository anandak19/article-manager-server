import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AUTH_TOKENS } from './auth.tokens';
import { CacheModule } from '@core/lib/cache/cache.module';
import { OtpModule } from '@core/lib/otp/otp.module';
import { EmailModule } from '@core/lib/email/email.module';
import { UsersModule } from '@modules/users/users.module';
import { SignupService } from './services/signup/signup.service';
// import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CookieModule } from '@core/lib/cookie/cookie.module';
import { TokenService } from './services/token/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CacheModule,
    OtpModule,
    EmailModule,
    UsersModule,
    CookieModule,
    JwtModule,
    PassportModule.register({ session: false }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_TOKENS.AUTH_SERVICE, useClass: AuthService },
    { provide: AUTH_TOKENS.SIGNUP_SERVICE, useClass: SignupService },
    { provide: AUTH_TOKENS.AUTH_TOKEN_SERVICE, useClass: TokenService },
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AUTH_TOKENS.AUTH_SERVICE],
})
export class AuthModule {}
