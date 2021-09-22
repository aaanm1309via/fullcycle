import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller('/prefixo')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/test')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
