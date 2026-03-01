import { UserSignupDto } from '@modules/auth/dto/user-signup.dto';
import { IBaseResponse } from '@shared/interfaces/http-response.interface';
import { IUser, IUserRes } from './users.interface';

export interface IUserService {
  create(data: IUser): Promise<IBaseResponse>;

  isEmailExists(email: string): Promise<boolean>;

  authenticateUser(email: string, password: string): Promise<IUserRes>;
}

export interface IPendingUserService {
  create(data: UserSignupDto): Promise<boolean>;
  isEmailExists(email: string): Promise<boolean>;
  findOne(email: string): Promise<IUser>;
}
