import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Medicine {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  price: number;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
