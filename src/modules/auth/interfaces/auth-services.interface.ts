import { IBaseResponse } from '@shared/interfaces/http-response.interface';
import { UserSignupDto } from '../dto/user-signup.dto';
import { VerfiyOtpDto } from '../dto/verify-otp.dto';
import { OtpTimeResponseDto } from '../dto/otp-time.dto';
import { IPayload, IUserRes } from '@modules/users/interfaces/users.interface';
import { Response } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';

export interface IAuthService {
  login(loginDto: LoginUserDto, res: Response): Promise<IBaseResponse>;
  validateLocalUser(email: string, password: string): Promise<IUserRes>;
}

export interface ITokenService {
  getNewAccessToken(payload: IPayload): Promise<string>;
  verifyToken(token: string): Promise<IPayload>;
}

export interface ISignupService {
  varifyEmail(data: UserSignupDto): Promise<IBaseResponse>;
  verifyOtp(dto: VerfiyOtpDto): Promise<IBaseResponse>;
  resendOtp(email: string): Promise<IBaseResponse>;
  getOtpTimeLeft(email: string): Promise<OtpTimeResponseDto>;
}
