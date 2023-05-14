import { IsNotEmpty, IsString } from 'class-validator';

export class EditCompanyDto {
  email_company?: string;
  industry?: string[];
  name_company?: string;
  total_employee?: string;
  facebook_url?: string;
  linkedin_url?: string;
  website_url?: string;
  address?: string;
  about?: string;
}

export class CompanyPasswordsDto {
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
