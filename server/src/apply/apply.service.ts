import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ApplyService {
  constructor(private prisma: PrismaService) {}

  async applyJobs(userId: string, jobId: string) {
    await this.prisma.application.create({ data: { userId, jobId } });
    throw new HttpException('Applied jobs', HttpStatus.CREATED);
  }

  async isApplied(jobId: string, id) {
    return await this.prisma.application.findMany({
      where: { jobId, userId: id },
    });
  }

  async saveJobs(user_id: string, job_id: string) {
    await this.prisma.saveJob.create({ data: { user_id, job_id } });
    throw new HttpException('Saved jobs', HttpStatus.CREATED);
  }

  async isSaved(job_id: string, id) {
    return await this.prisma.saveJob.findMany({
      where: { job_id, user_id: id },
    });
  }

  async getJobApplyByStudent(id: string) {
    return await this.prisma.application.findMany({
      where: { userId: id },
      include: { job: true },
    });
  }
  async getJobSavedByStudent(id: string) {
    const saves = await this.prisma.saveJob.findMany({
      where: { user_id: id },
      include: { job: true },
    });
    console.log(saves);
    return saves;
  }
}
