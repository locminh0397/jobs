import { GetEmployee, HasRoles } from 'src/auth/decorator';
import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyPasswordsDto, EditCompanyDto } from './company.dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'enum/roles.enum';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Patch('edit-profile')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.employer)
  editCompany(@Body() companyDto: EditCompanyDto, @GetEmployee() id: string) {
    return this.companyService.editCompany(companyDto, id);
  }

  @Patch('edit-password')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.employer)
  changePassword(
    @Body() password: CompanyPasswordsDto,
    @GetEmployee() id: string,
  ) {
    return this.companyService.changePassword(id, password);
  }

  @Patch('upload-logo')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.employer)
  updateLogo(@Body('logo_url') logo: string, @GetEmployee() id: string) {
    return this.companyService.updateLogo(logo, id);
  }
}
