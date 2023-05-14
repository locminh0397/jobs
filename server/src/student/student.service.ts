import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EducationDto, ExperienceDto, PasswordsDto } from './student.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async createEducation(educationDto: EducationDto, user_id: string) {
    const { start_year, end_year, school_name, gpa_score } = educationDto;

    await this.prisma.education.create({
      data: { start_year, end_year, school_name, gpa_score, user_id },
    });

    throw new HttpException('Successfully created!', HttpStatus.CREATED);
  }

  async getEducation(user_id: string) {
    const education = await this.prisma.education.findMany({
      where: { user_id },
    });
    return education;
  }

  async deleteEducation(id: string) {
    await this.prisma.education.delete({
      where: { id },
    });
    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }

  async createExperience(experienceDto: ExperienceDto, user_id: string) {
    await this.prisma.experience.create({
      data: { ...experienceDto, user_id },
    });
    throw new HttpException('Successfully created', HttpStatus.CREATED);
  }

  async deleteExperience(id: string) {
    await this.prisma.experience.delete({
      where: { id },
    });
    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }

  async getExperience(user_id: string) {
    return await this.prisma.experience.findMany({ where: { user_id } });
  }

  async changePassword(id: string, passwordsDto: PasswordsDto) {
    const { old_password, new_password, confirm_password } = passwordsDto;

    const user = await this.prisma.user.findUnique({ where: { id } });

    const isCorrect = await bcrypt.compare(old_password, user.hash);

    if (!isCorrect) {
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
    }

    const hash = await bcrypt.hash(new_password, 10);

    await this.prisma.user.update({ where: { id }, data: { hash } });

    throw new HttpException('Change password successfully', HttpStatus.OK);
  }
}
