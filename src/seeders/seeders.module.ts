import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from 'src/school/entities/school.entity';
import { SchoolSeeder } from './school.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  providers: [SchoolSeeder],
})
export class SeedersModule {}
