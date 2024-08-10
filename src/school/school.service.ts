import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto) {
    const newSchool = this.schoolRepository.create(createSchoolDto);

    try {
      return await this.schoolRepository.save(newSchool);
    } catch (error) {
      throw new Error('Error creating a new school: ' + error.message);
    }
  }

  async findAll(): Promise<School[]> {
    return await this.schoolRepository.find();
  }

  async findOne(id: string) {
    const school = await this.schoolRepository.findOne({
      where: { id },
    });

    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    return school;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const updateResult: UpdateResult = await this.schoolRepository.update(
      id,
      updateSchoolDto,
    );

    // Check if any rows were affected, meaning the entity existed and was updated
    if (updateResult.affected === 0) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    // If you need to return the updated entity, you need to fetch it again
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const school = await this.findOne(id);
    await this.schoolRepository.remove(school);
  }
}
