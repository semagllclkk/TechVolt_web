import { IsString, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  imagePath: string;

  @IsDateString()
  date: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}