import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from 'src/schemas/contact.schema';
import { JWTGuard } from 'src/auth/guard/jwt.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseGuards(JWTGuard)
  async createContact(
    @Body() createContactDto: CreateContactDto,
    @Req() req,
  ): Promise<Contact> {
    const user = req.user;
    return this.contactsService.create(createContactDto, user);
  }

  @Get()
  @UseGuards(JWTGuard)
  async getFindAllContacts(@Req() req): Promise<Contact[]> {
    const user = req.user;
    const contacts = await this.contactsService.findAll(user._id);
    return contacts;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
