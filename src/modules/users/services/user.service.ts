import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUserService } from '../interfaces/users-services.interface';
import { IBaseResponse } from '@shared/interfaces/http-response.interface';
import { HashService } from '@core/lib/hash/hash.service';
import { ICreateUser, IUser } from '../interfaces/users.interface';
import { USER_TOKENS } from '../users.tokens';
import type { IUserRepository } from '../interfaces/users-repositories.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private _hash: HashService,
    @Inject(USER_TOKENS.USER_REPOSITORIES) private _userRepo: IUserRepository,
  ) {}
  async create(data: IUser): Promise<IBaseResponse> {
    /**
     * create createuser object
     * call repo
     * if error throw error
     */
    const newUser: ICreateUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash: data.passwordHash,
    };

    const createdUser = await this._userRepo.create(newUser);
    if (!createdUser) {
      throw new InternalServerErrorException('Faild to create user');
    }

    return { message: 'User Created' };
  }

  async isEmailExists(email: string): Promise<boolean> {
    const exists = await this._userRepo.findOne({ email: email });
    return exists ? true : false;
  }
}
