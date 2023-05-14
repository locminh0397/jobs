import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { EducationDto, ExperienceDto, PasswordsDto } from './student.dto';
import { GetCandidate, HasRoles } from 'src/auth/decorator';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'enum/roles.enum';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/create-education')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  createEducation(
    @Body() educationDto: EducationDto,
    @GetCandidate() user_id: string,
  ) {
    return this.studentService.createEducation(educationDto, user_id);
  }

  @Get('/get-education')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  getEducation(@GetCandidate() user_id: string) {
    return this.studentService.getEducation(user_id);
  }

  @Delete('/delete-education/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  deleteEducation(@Param('id') id: string) {
    return this.studentService.deleteEducation(id);
  }

  @Post('/create-experience')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  createExperience(
    @Body() experienceDto: ExperienceDto,
    @GetCandidate() user_id: string,
  ) {
    return this.studentService.createExperience(experienceDto, user_id);
  }

  @Delete('/delete-experience/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  deleteExpericence(@Param('id') id: string) {
    return this.studentService.deleteExperience(id);
  }

  @Get('/get-experience')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  getExperience(@GetCandidate() user_id: string) {
    return this.studentService.getExperience(user_id);
  }

  @Patch('/change-password')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  changePassword(
    @GetCandidate() user_id: string,
    @Body() passwordsDto: PasswordsDto,
  ) {
    return this.studentService.changePassword(user_id, passwordsDto);
  }
}
