import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDateString,
  IsBoolean,
  IsNumber,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

// ── Core Section DTOs ──────────────────────────────────────────

export class CreateExperienceDto {
  @IsString()
  jobTitle: string;

  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bulletPoints?: string[];
}

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  @IsIn(['hard', 'soft'])
  category?: string;
}

export class CreateEducationDto {
  @IsString()
  institution: string;

  @IsString()
  degree: string;

  @IsOptional()
  @IsString()
  fieldOfStudy?: string;

  @IsOptional()
  @IsString()
  graduationYear?: string;

  @IsOptional()
  @IsString()
  gpa?: string;

  @IsOptional()
  @IsString()
  honors?: string;
}

// ── Dynamic Optional Section DTOs ──────────────────────────────

export class CreateCertificationDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  issuer?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  url?: string;
}

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  technologies?: string;
}

export class CreateVolunteerDto {
  @IsString()
  role: string;

  @IsString()
  organization: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreatePublicationDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  url?: string;
}

export class CreateLanguageDto {
  @IsString()
  language: string;

  @IsOptional()
  @IsString()
  fluency?: string;
}

export class CreateReferenceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;

  @IsOptional()
  @IsBoolean()
  availableUponRequest?: boolean;
}

export class CreateCustomSectionDto {
  @IsString()
  sectionTitle: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

// ── Main Resume DTO ────────────────────────────────────────────

export class CreateResumeDto {
  // Metadata
  @IsOptional()
  @IsString()
  @IsIn(['RESUME', 'CV'])
  documentType?: string;

  @IsOptional()
  @IsString()
  @IsIn(['professional', 'modern', 'creative'])
  templateId?: string;

  // Personal details / header
  @IsOptional()
  @IsString()
  fullName?: string;

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
  @IsString()
  location?: string;

  // Links & portfolio
  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  githubUrl?: string;

  @IsOptional()
  @IsString()
  portfolioUrl?: string;

  @IsOptional()
  @IsString()
  websiteUrl?: string;

  @IsOptional()
  @IsString()
  dribbbleUrl?: string;

  // Core sections
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEducationDto)
  education?: CreateEducationDto[];

  // Dynamic optional sections
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCertificationDto)
  certifications?: CreateCertificationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDto)
  projects?: CreateProjectDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVolunteerDto)
  volunteer?: CreateVolunteerDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePublicationDto)
  publications?: CreatePublicationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLanguageDto)
  languages?: CreateLanguageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReferenceDto)
  references?: CreateReferenceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCustomSectionDto)
  customSections?: CreateCustomSectionDto[];
}
