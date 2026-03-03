import { Users } from '@modules/users/schemas/users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Articles {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Users.name })
  userId: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export type ArticlesDocument = HydratedDocument<Articles>;
export const ArticlesSchema = SchemaFactory.createForClass(Articles);
