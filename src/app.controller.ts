import { Controller, Delete, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  solveMapPoly(): Promise<void> {
    return this.appService.solveMapPoly();
  }

  @Post('/a')
  solveMapPoly2(): Promise<void> {
    return this.appService.testCosa();
  }

  @Delete()
  wipeMapPoly(): Promise<void> {
    return this.appService.wipeMapPoly();
  }
}
