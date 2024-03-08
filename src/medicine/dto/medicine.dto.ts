import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Medicine } from 'src/schemas/medicine.schema';

export class CreateContactDto extends Medicine {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  readonly price: number;

  @IsOptional()
  readonly id: string;
}
