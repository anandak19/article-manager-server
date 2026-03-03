import { _QueryFilter } from 'mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import { ICreateUser } from './users.interface';
import { PendingUsersDocument } from '../schemas/pending-users.schema';

export interface IUserRepository {
  create(data: ICreateUser): Promise<UsersDocument>;
  findOne(data: _QueryFilter<Users>): Promise<UsersDocument | null>;
}

export interface IPendingUserRepository {
  upsertUser(user: ICreateUser): Promise<boolean>;
  findOne(email: string): Promise<PendingUsersDocument | null>;
}
