import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserSignupDto } from '../dto/user-signup.dto';
import { AUTH_TOKENS } from '../auth.tokens';
import type { IAuthService } from '../interfaces/auth-services.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_TOKENS.AUTH_SERVICE) private _authService: IAuthService) {}

  @Post('signup/data')
  varifyEmail(@Body() dto: UserSignupDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._authService.varifyEmail(dto);
  }

  @Post('signup/verify')
  verifyOtp() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._authService.verifyOtp();
  }
}
