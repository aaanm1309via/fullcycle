import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { TenantService } from '../tenant/tenant/tenant.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../tenant/tenant.guard';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private tenantService: TenantService,
    ) {}


  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll() {
    console.log(this.tenantService.tenant.subdomain);
    return this.reportsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reportsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportsService.remove(+id);
  // }
}
