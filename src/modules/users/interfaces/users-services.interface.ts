import { UserSignupDto } from '@modules/auth/dto/user-signup.dto';
import { IBaseResponse } from '@shared/interfaces/http-response.interface';
import { IUser } from './users.interface';

export interface IUserService {
  create(data: IUser): Promise<IBaseResponse>;

  isEmailExists(email: string): Promise<boolean>;
}

export interface IPendingUserService {
  create(data: UserSignupDto): Promise<boolean>;
  isEmailExists(email: string): Promise<boolean>;
  findOne(email: string): Promise<IUser>;
}
