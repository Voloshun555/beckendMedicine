import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from 'src/schemas/contact.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: mongoose.Model<Contact>,
  ) {}

  async create(contact: Contact, owner: User): Promise<Contact> {
    console.log('Received contact:', contact);
    console.log('Received owner:', owner);
    const data = Object.assign(contact, { owner: owner._id });
    const createdContact = await this.contactModel.create(data);

    return createdContact;
  }

  async findAll(ownerId: string): Promise<Contact[]> {
    const contacts = await this.contactModel
      .find({ owner: ownerId })
      .populate('owner')
      .exec();
    return contacts;
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id);
    if (!contact) {
      throw new NotFoundException('Contact not found.');
    }

    return contact;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return await this.contactModel.findByIdAndUpdate(id, updateContactDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return await this.contactModel.findByIdAndDelete(id);
  }
}
