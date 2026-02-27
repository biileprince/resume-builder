import { 
  IsString, 
  IsEmail, 
  IsOptional, 
  IsArray, 
  ValidateNested, 
  IsDateString 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExperienceDto {
  @IsString()
  jobTitle: string;

  @IsString()
  company: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  level?: string;
}

export class CreateResumeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExperienceDto)
  experiences?: CreateExperienceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  skills?: CreateSkillDto[];
}
