import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        date: new Date(createProjectDto.date),
      },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      where: { isActive: true },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { date, ...restData } = updateProjectDto;

    return this.prisma.project.update({
      where: { id },
      data: {
        ...restData,
        ...(date && { date: new Date(date) }),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}