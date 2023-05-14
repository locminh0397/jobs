import { IsString, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class GoogleDto {
  id: string;
  name: string;
  email: string;
  image: string;
}

export class EditStudentDto {
  @IsString()
  full_name: string;
  @IsString()
  phone: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  address: string;
  @IsString()
  industry: string;
}

export class EmployerSignupDto {
  @IsString()
  @IsNotEmpty()
  user_name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
  @IsString()
  @IsNotEmpty()
  name_company: string;
  @IsString()
  @IsNotEmpty()
  email_company: string;
}

export class EmployerSigninDto {
  @IsString()
  @IsNotEmpty()
  user_name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
