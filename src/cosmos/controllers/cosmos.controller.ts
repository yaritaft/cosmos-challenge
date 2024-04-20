import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { CosmosService } from '../services/cosmos.service';
import { SolveMapRequest } from '../dtos/solveMap.dto';
import { ApiTags, ApiOperation, ApiBasicAuth } from '@nestjs/swagger';
// import { WipeMapRequest } from '../dtos/wipeMap.dto';
import { ApiKeyGuard } from '../../authGuard';

@Controller('/cosmos')
@ApiBasicAuth('api-key')
@UseGuards(ApiKeyGuard)
@ApiTags('Cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Version('1')
  @ApiBasicAuth('api-key')
  @Post()
  @ApiOperation({
    description:
      'This endpoint is going to create the megaverse for a given candidate id on the payload.',
  })
  solveMap(@Body() { candidateId }: SolveMapRequest): Promise<void> {
    return this.cosmosService.solveMap(candidateId);
  }

  //   @Delete()
  //   wipeMapPoly(@Body() { candidateId }: WipeMapRequest): Promise<void> {
  //     return this.cosmosService.wipeMap(candidateId);
  //   }
}
