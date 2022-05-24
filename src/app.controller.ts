import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger('Testing');
  @Get()
  httpCallTest() {
    this.logger.log('Http Testing');
    return this.appService.testingLog();
  }
}
