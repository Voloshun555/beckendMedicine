import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema'; // Путь к схеме пользователя

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  image: string;

  @Prop({ type: User }) // Добавляем свойство owner типа User
  owner: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
