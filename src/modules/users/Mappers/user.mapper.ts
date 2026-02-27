import { IUser } from '../interfaces/users.interface';
import { PendingUsersDocument } from '../schemas/pending-users.schema';
import { UsersDocument } from '../schemas/users.schema';

export class UserMapper {
  static toResponse(user: UsersDocument | PendingUsersDocument): IUser {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      passwordHash: user.passwordHash,
      id: user._id.toString(),
    };
  }
}
