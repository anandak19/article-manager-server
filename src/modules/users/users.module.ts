import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import { USER_TOKENS } from './users.tokens';
import { UserService } from './services/user.service';
import { HashModule } from '@core/lib/hash/hash.module';
import { UserRepository } from './repositories/user.repository';
import { PendingUsers, PendingUsersSchema } from './schemas/pending-users.schema';
import { PendingUserRepository } from './repositories/pending-user.repository.schema';
import { PendingUserService } from './services/pending-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: PendingUsers.name, schema: PendingUsersSchema },
    ]),
    HashModule,
  ],
  providers: [
    {
      provide: USER_TOKENS.USER_REPOSITORIES,
      useClass: UserRepository,
    },
    {
      provide: USER_TOKENS.USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_TOKENS.PENDING_USER_REPOSITORIES,
      useClass: PendingUserRepository,
    },
    {
      provide: USER_TOKENS.PENDING_USER_SERVICE,
      useClass: PendingUserService,
    },
  ],
  exports: [USER_TOKENS.USER_SERVICE, USER_TOKENS.PENDING_USER_SERVICE],
})
export class UsersModule {}
