import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { School } from 'src/school/entities/school.entity';

@Injectable()
export class SchoolSeeder {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async run() {
    for (let i = 0; i < 10; i++) {
      const school = this.schoolRepository.create({
        name: faker.company.name(),
        address: faker.address.streetAddress(),
      });

      await this.schoolRepository.save(school);
    }
  }
}
