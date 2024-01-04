import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './users.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Contact {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop({ required: true, default: new Date() })
  data: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const ContactsSchema = SchemaFactory.createForClass(Contact);
