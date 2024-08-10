import { IsOptional } from 'class-validator';

export class CreateSchoolDto {
  @IsOptional()
  name: string;

  @IsOptional()
  address: string;
}
