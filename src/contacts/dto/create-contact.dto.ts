import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Contact } from 'src/schemas/contact.schema';

export class CreateContactDto extends Contact {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly date: Date;

  @IsOptional()
  readonly userId: string;
}
