import { Controller, Get, Logger } from '@nestjs/common';

@Controller('test')
export class AppController {
  private readonly logger = new Logger('Testing');
  @Get()
  httpCallTest() {
    this.logger.log('Http Testing');
    return 'test';
  }
}
