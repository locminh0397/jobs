import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CompanyPasswordsDto, EditCompanyDto } from './company.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async editCompany(editCompanyDto: EditCompanyDto, id: string) {
    await this.prisma.company.update({
      data: { ...editCompanyDto },
      where: { id },
    });

    throw new HttpException('Update successful', HttpStatus.OK);
  }

  async changePassword(id: string, passwordsDto: CompanyPasswordsDto) {
    const { old_password, new_password, confirm_password } = passwordsDto;

    const user = await this.prisma.company.findUnique({ where: { id } });

    const isCorrect = await bcrypt.compare(old_password, user.hash);

    if (!isCorrect) {
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
    }

    const hash = await bcrypt.hash(new_password, 10);

    await this.prisma.company.update({ where: { id }, data: { hash } });

    throw new HttpException('Change password successfully', HttpStatus.OK);
  }

  async updateLogo(logo_url: string, id: string) {
    await this.prisma.company.update({ where: { id }, data: { logo_url } });
    throw new HttpException('Change password successfully', HttpStatus.OK);
  }
}
