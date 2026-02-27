import { IBaseResponse } from '@shared/interfaces/http-response.interface';
import { UserSignupDto } from '../dto/user-signup.dto';
import { VerfiyOtpDto } from '../dto/verify-otp.dto';
import { OtpTimeResponseDto } from '../dto/otp-time.dto';
import { LoginUserDto } from '../dto/login-user.dto';

export interface IAuthService {
  login(dto: LoginUserDto): Promise<IBaseResponse>;
}

export interface ISignupService {
  varifyEmail(data: UserSignupDto): Promise<IBaseResponse>;
  verifyOtp(dto: VerfiyOtpDto): Promise<IBaseResponse>;
  resendOtp(email: string): Promise<IBaseResponse>;
  getOtpTimeLeft(email: string): Promise<OtpTimeResponseDto>;
}
