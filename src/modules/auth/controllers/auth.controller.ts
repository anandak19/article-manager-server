import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserSignupDto } from '../dto/user-signup.dto';
import { AUTH_TOKENS } from '../auth.tokens';
import { VerfiyOtpDto } from '../dto/verify-otp.dto';
import { SignupEmailDto } from '../dto/signup-email.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import type { Response } from 'express';
import type { IAuthService, ISignupService } from '../interfaces/auth-services.interface';
import type { IAuthenticatedRequest } from '@shared/interfaces/common.interface';
import { AuthGuard } from '@core/guards/auth.guard';

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

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this._authService.logout(res);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getLoginUserData(@Req() req: IAuthenticatedRequest) {
    return req.user;
  }
}
