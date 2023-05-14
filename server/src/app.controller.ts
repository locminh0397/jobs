import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Param,
  Get,
  StreamableFile,
  HttpException,
  UseGuards,
  Delete,
  HttpStatus,
  Patch,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, unlink } from 'fs';
import { join } from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { AccessTokenGuard, RolesGuard } from './auth/guard';
import { GetCandidate, HasRoles } from './auth/decorator';
import { Roles } from 'enum/roles.enum';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Post('upload')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @GetCandidate() id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { resume: file.filename },
    });
    throw new HttpException('Succeeded upload', HttpStatus.OK);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student, Roles.employer)
  @Get('download/resume')
  async download(
    @Res({ passthrough: true }) res: Response,
    @GetCandidate() id: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const file = createReadStream(
      join(process.cwd(), `/uploads/${user.resume}`),
    );

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename=' + user.resume,
    });
    return new StreamableFile(file);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.employer)
  @Get('download/resume/:id')
  async downloadForEmployer(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const file = createReadStream(
      join(process.cwd(), `/uploads/${user.resume}`),
    );

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename=' + user.resume,
    });
    return new StreamableFile(file);
  }

  @Delete('delete/:fileName')
  async deletePicture(@Param('fileName') fileName: string) {
    console.log(fileName);
    await unlink(join(process.cwd(), `/uploads/${fileName}`), (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
  }

  @Patch('save-avatar')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  async saveImage(@Body('url') url: string, @GetCandidate() id: string) {
    await this.prisma.user.update({ where: { id }, data: { avatar_url: url } });

    throw new HttpException('Success', HttpStatus.OK);
  }
}
