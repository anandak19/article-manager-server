import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class PendingUsers {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  passwordHash: string;

  @Prop({
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000),
    expires: 0,
  })
  expiresAt: Date;
}

export type PendingUsersDocument = HydratedDocument<PendingUsers>;
export const PendingUsersSchema = SchemaFactory.createForClass(PendingUsers);
