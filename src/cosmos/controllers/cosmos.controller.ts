import { Body, Controller, Post } from '@nestjs/common';
import { CosmosService } from '../services/cosmos.service';
import { SolveMapRequest } from '../dtos/solveMap.dto';
// import { WipeMapRequest } from '../dtos/wipeMap.dto';

@Controller()
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Post()
  solveMap(@Body() { candidateId }: SolveMapRequest): Promise<void> {
    return this.cosmosService.solveMap(candidateId);
  }

  //   @Delete()
  //   wipeMapPoly(@Body() { candidateId }: WipeMapRequest): Promise<void> {
  //     return this.cosmosService.wipeMap(candidateId);
  //   }
}
