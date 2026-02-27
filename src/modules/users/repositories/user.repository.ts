import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import { _QueryFilter, Model } from 'mongoose';
import { ICreateUser } from '../interfaces/users.interface';
import { IUserRepository } from '../interfaces/users-repositories.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(Users.name) private _usersModel: Model<Users>) {}

  async create(data: ICreateUser): Promise<UsersDocument> {
    console.log('Create user Before');
    const createdUser = await this._usersModel.create(data);
    return createdUser.save();
  }

  async findOne(data: _QueryFilter<UsersDocument>): Promise<UsersDocument | null> {
    console.log('Find one user Before');
    return await this._usersModel.findOne(data);
  }
}
