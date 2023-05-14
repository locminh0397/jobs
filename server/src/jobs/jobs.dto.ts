import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJobsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  requirements: string;

  @IsNotEmpty()
  @IsNumber()
  from_salary: number;

  @IsNotEmpty()
  @IsNumber()
  to_salary: number;

  @IsNotEmpty()
  @IsBoolean()
  hidden_salary: boolean;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  job_type: string;

  @IsNotEmpty()
  @IsString()
  industry: string;
}

export class EditJobsDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  requirements?: string;

  @IsNumber()
  from_salary?: number;

  @IsNumber()
  to_salary?: number;

  @IsBoolean()
  hidden_salary?: boolean;

  @IsString()
  location?: string;

  @IsString()
  job_type?: string;

  @IsString()
  industry?: string;
}
