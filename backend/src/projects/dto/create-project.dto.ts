import { IsString, IsDateString, IsBoolean, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  imagePath: string;

  @IsDateString()
  date: string;

  @IsString()
  capacity: string;

  @IsString()
  location: string;

  @IsString()
  category: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsInt()
  panelCount: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}