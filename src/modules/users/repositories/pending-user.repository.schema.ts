import { InjectModel } from '@nestjs/mongoose';
import { PendingUsers, PendingUsersDocument } from '../schemas/pending-users.schema';
import { Injectable } from '@nestjs/common';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { IPendingUserRepository } from '../interfaces/users-repositories.interface';
import { ICreateUser } from '../interfaces/users.interface';

@Injectable()
export class PendingUserRepository implements IPendingUserRepository {
  constructor(@InjectModel(PendingUsers.name) private _pendingUsersModel: Model<PendingUsers>) {}

  findOne(email: string): Promise<PendingUsersDocument | null> {
    return this._pendingUsersModel.findOne({ email });
  }

  async upsertUser(user: ICreateUser): Promise<boolean> {
    console.log('Create pending user Before');
    const results: UpdateWriteOpResult = await this._pendingUsersModel.updateOne(
      { email: user.email },
      {
        $set: {
          firstName: user.firstName,
          lastName: user.lastName,
          passwordHash: user.passwordHash,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        },
      },
      {
        upsert: true,
      },
    );
    console.log('Create pending user After');
    return results.acknowledged && results.modifiedCount > 0;
  }
}
