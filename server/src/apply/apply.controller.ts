import { getSavedByStudent } from './../../../client/services/job';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'enum/roles.enum';
import { GetCandidate, HasRoles } from 'src/auth/decorator';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post('create')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  applyJobs(@GetCandidate() userId: string, @Body('jobId') jobId: string) {
    return this.applyService.applyJobs(userId, jobId);
  }

  @Get('get-apply/:jobId')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  isApplied(@Param('jobId') jobId: string, @GetCandidate() id: string) {
    return this.applyService.isApplied(jobId, id);
  }

  @Post('save')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  saveJobs(@GetCandidate() userId: string, @Body('job_id') jobId: string) {
    return this.applyService.saveJobs(userId, jobId);
  }

  @Get('get-save/:job_id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  isSaved(@Param('job_id') jobId: string, @GetCandidate() id: string) {
    return this.applyService.isSaved(jobId, id);
  }

  @Get('get-apply-student')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  getJobApplyByStudent(@GetCandidate() id: string) {
    return this.applyService.getJobApplyByStudent(id);
  }
  @Get('get-save-job')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.student)
  getJobSavedByStudent(@GetCandidate() id: string) {
    console.log(id);
    return this.applyService.getJobSavedByStudent(id);
  }
}
