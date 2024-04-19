import { Controller, Delete, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  solveMapPoly(): Promise<void> {
    return this.appService.solveMapPoly();
  }

  @Delete()
  wipeMapPoly(): Promise<void> {
    return this.appService.wipeMapPoly();
  }
}
