import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPendingUserService } from '../interfaces/users-services.interface';
import { UserSignupDto } from '@modules/auth/dto/user-signup.dto';
import type { IPendingUserRepository } from '../interfaces/users-repositories.interface';
import { HashService } from '@core/lib/hash/hash.service';
import { ICreateUser, IUser } from '../interfaces/users.interface';
import { UserMapper } from '../Mappers/user.mapper';
import { USER_TOKENS } from '../users.tokens';

@Injectable()
export class PendingUserService implements IPendingUserService {
  constructor(
    @Inject(USER_TOKENS.PENDING_USER_REPOSITORIES) private _pendingUserRepo: IPendingUserRepository,
    private _hash: HashService,
  ) {}

  async isEmailExists(email: string): Promise<boolean> {
    const user = await this._pendingUserRepo.findOne(email);
    return user ? true : false;
  }

  async create(data: UserSignupDto): Promise<boolean> {
    const passwordHash = await this._hash.hash(data.password);
    const createUser: ICreateUser = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordHash,
    };
    return await this._pendingUserRepo.upsertUser(createUser);
  }

  async findOne(email: string): Promise<IUser> {
    const user = await this._pendingUserRepo.findOne(email);
    if (!user) {
      throw new NotFoundException('User Details not found');
    }
    return UserMapper.toResponse(user);
  }
}
