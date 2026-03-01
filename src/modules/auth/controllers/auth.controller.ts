import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { UserSignupDto } from '../dto/user-signup.dto';
import { AUTH_TOKENS } from '../auth.tokens';
import type { IAuthService, ISignupService } from '../interfaces/auth-services.interface';
import { VerfiyOtpDto } from '../dto/verify-otp.dto';
import { SignupEmailDto } from '../dto/signup-email.dto';
import type { Response } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_TOKENS.AUTH_SERVICE) private _authService: IAuthService,
    @Inject(AUTH_TOKENS.SIGNUP_SERVICE) private _signupService: ISignupService,
  ) {}

  @Post('signup/data')
  varifyEmail(@Body() dto: UserSignupDto) {
    return this._signupService.varifyEmail(dto);
  }

  @Post('signup/verify')
  verifyOtp(@Body() dto: VerfiyOtpDto) {
    return this._signupService.verifyOtp(dto);
  }

  @Post('signup/varify/time')
  getRemainingTime(@Body() dto: SignupEmailDto) {
    return this._signupService.getOtpTimeLeft(dto.email);
  }

  @Post('signup/verify/resend')
  resendOtp(@Body() dto: SignupEmailDto) {
    return this._signupService.resendOtp(dto.email);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    return this._authService.login(loginDto, res);
  }
}
