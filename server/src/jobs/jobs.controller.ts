import {
  Controller,
  UseGuards,
  Body,
  Patch,
  Post,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobsDto, EditJobsDto } from './jobs.dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guard';
import { GetEmployee, HasRoles } from 'src/auth/decorator';
import { Roles } from 'enum/roles.enum';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.employer)
  @Post('create')
  createJob(@Body() jobDto: CreateJobsDto, @GetEmployee() employer_id: string) {
    return this.jobsService.createJob(jobDto, employer_id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.employer)
  @Patch('edit/:id')
  editJob(@Body() jobDto: EditJobsDto, @Param('id') id: string) {
    return this.jobsService.editJob(jobDto, id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.employer)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.jobsService.deleteJob(id);
  }

  @Get('get-jobs')
  getAllJobs(@Query('skip') skip?: number, @Query('take') take?: number) {
    return this.jobsService.getAllJobs(skip, take);
  }

  @Get('details/:id')
  getJobDetails(@Param('id') id: string) {
    return this.jobsService.getJobDetails(id);
  }

  @Get('search')
  getJobsByTitle(
    @Query('title') title: string,
    @Query('location') location: string,
  ) {
    return this.jobsService.getJobsByTitle(location, title);
  }

  @Get('/get-by-industry/:industry')
  getJobByIndustry(
    @Param('industry') industry: string,
    @Query('id') id: string,
  ) {
    return this.jobsService.findByIndustry(industry, id);
  }

  @Get('/get-by-industry-not-id/:industry')
  getJobByIndustryWithoutId(@Param('industry') industry: string) {
    return this.jobsService.getJobByIndustryWithoutId(industry);
  }

  @Get('/apply-job')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.employer)
  getJobApplyForEmployer(@GetEmployee() id: string) {
    return this.jobsService.getJobApplyForEmployer(id);
  }
}
