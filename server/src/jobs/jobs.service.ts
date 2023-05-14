import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateJobsDto, EditJobsDto } from './jobs.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async createJob(jobDto: CreateJobsDto, employer_id) {
    await this.prisma.job.create({
      data: { ...jobDto, company_id: employer_id },
    });
    throw new HttpException('Created job successfully', HttpStatus.CREATED);
  }

  async editJob(editJobDto: EditJobsDto, id: string) {
    await this.prisma.job.update({
      data: { ...editJobDto },
      where: { id },
    });
    throw new HttpException('Created job successfully', HttpStatus.OK);
  }

  async deleteJob(id: string) {
    await this.prisma.job.delete({
      where: { id },
    });
    throw new HttpException('Created job successfully', HttpStatus.OK);
  }

  async getAllJobs(skip?: number, take?: number) {
    return await this.prisma.job.findMany({
      orderBy: { created_at: 'desc' },
      skip: skip,
      // take: take ? Number(take) : take,
      include: { company: true },
    });
  }

  async getJobDetails(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { company: true, applications: true },
    });
    delete job.company.hash;
    delete job.company.user_name;
    return job;
  }

  async getJobsByTitle(location: string, title: string) {
    return await this.prisma.job.findMany({
      where: {
        title: { contains: title, mode: 'insensitive' },
        AND: { location },
      },
    });
  }

  async findByIndustry(industry: string, id) {
    return await this.prisma.job.findMany({
      where: { industry, NOT: { id } },
    });
  }

  async getJobByIndustryWithoutId(industry: string) {
    return await this.prisma.job.findMany({
      where: { industry },
    });
  }

  async getJobApplyForEmployer(id: string) {
    return await this.prisma.job.findMany({
      where: { company_id: id },
      select: {
        applications: { select: { id: true, user: true, job: true } },
      },
    });
  }
}
