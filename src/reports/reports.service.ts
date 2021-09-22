import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TenantService } from '../tenant/tenant/tenant.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {

  constructor(
    @InjectModel(Report)
    private reportModel: typeof Report,
    private tentantService: TenantService,

  ){

  }

  create(createReportDto: CreateReportDto) {
    return this.reportModel.create( {
      ...createReportDto,
      account_id: this.tentantService.tenant.id,
    });
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.reportModel.findByPk(id, {rejectOnEmpty: true})
    return report.update(updateReportDto);
  }


  findAll() {
    return this.reportModel.findAll({
      where: {
        account_id: this.tentantService.tenant.id
      }
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} report`;
  // }


  // remove(id: number) {
  //   return `This action removes a #${id} report`;
  // }
}
