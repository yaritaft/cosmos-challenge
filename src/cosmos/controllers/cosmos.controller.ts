import { Body, Controller, Post, Version } from '@nestjs/common';
import { CosmosService } from '../services/cosmos.service';
import { SolveMapRequest } from '../dtos/solveMap.dto';
// import { WipeMapRequest } from '../dtos/wipeMap.dto';

@Controller('/cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Version('1')
  @Post('/solveMap')
  solveMap(@Body() { candidateId }: SolveMapRequest): Promise<void> {
    return this.cosmosService.solveMap(candidateId);
  }

  //   @Delete()
  //   wipeMapPoly(@Body() { candidateId }: WipeMapRequest): Promise<void> {
  //     return this.cosmosService.wipeMap(candidateId);
  //   }
}
