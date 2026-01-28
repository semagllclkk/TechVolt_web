import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) { }

  async create(createContactDto: CreateContactDto) {
    return this.prisma.contactMessage.create({
      data: {
        name: createContactDto.name,
        email: createContactDto.email,
        phone: createContactDto.phone,
        message: createContactDto.message,
        isRead: false,
      },
    });
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: updateContactDto,
    });
  }

  async remove(id: number) {
    return this.prisma.contactMessage.delete({
      where: { id },
    });
  }
}
