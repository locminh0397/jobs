import { Body, Controller, Post, Get, UseGuards, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  EditStudentDto,
  EmployerSigninDto,
  EmployerSignupDto,
  GoogleDto,
  SigninDto,
  SignupDto,
} from './auth-dto';
import { GetCandidate, GetEmployee, HasRoles } from './decorator';
import { AccessTokenGuard, RolesGuard } from './guard';
import { Roles } from 'enum/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user/signup')
  userSignup(@Body() user: SignupDto) {
    return this.authService.userSignup(user);
  }

  @Post('/user/signin')
  userSignin(@Body() user: SigninDto) {
    return this.authService.userSignin(user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/get-user')
  getUser(@GetCandidate() id: string) {
    return this.authService.getUser(id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  @Patch('/user/update-user')
  updateProfile(
    @GetCandidate() id: string,
    @Body() editStudentDto: EditStudentDto,
  ) {
    return this.authService.editProfileUser(id, editStudentDto);
  }

  @Post('employer/signup')
  employerSignup(@Body() employerSignupDto: EmployerSignupDto) {
    return this.authService.employerSignup(employerSignupDto);
  }

  @Post('employer/signin')
  employerSignin(@Body() employerSigninDto: EmployerSigninDto) {
    return this.authService.employerSignin(employerSigninDto);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.employer)
  @Get('/get-employer')
  getEmployer(@GetEmployee() id: string) {
    return this.authService.getEmployer(id);
  }
}
