import { IsNotEmpty, IsString } from 'class-validator';

export class EducationDto {
  @IsString()
  @IsNotEmpty()
  school_name: string;
  @IsString()
  @IsNotEmpty()
  start_year: string;
  @IsString()
  @IsNotEmpty()
  end_year: string;
  @IsString()
  @IsNotEmpty()
  gpa_score: number;
}

export class ExperienceDto {
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsString()
  @IsNotEmpty()
  started_at: string;

  @IsString()
  @IsNotEmpty()
  end_at: string;
}

export class PasswordsDto {
  @IsString()
  @IsNotEmpty()
  old_password: string;
  @IsString()
  @IsNotEmpty()
  new_password: string;
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
