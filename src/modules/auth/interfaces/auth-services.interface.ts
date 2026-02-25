import { IBaseResponse } from '@shared/interfaces/http-response.interface';
import { UserSignupDto } from '../dto/user-signup.dto';

export interface IAuthService {
  varifyEmail(data: UserSignupDto): Promise<IBaseResponse>;
  verifyOtp(): Promise<IBaseResponse>;
}
