import {
  Body,
  Controller,
  Post,
  Delete,
  UseGuards,
  Version,
} from '@nestjs/common';
import { MegaversesService } from '../services/megaverses.service';
import { SolveMapRequest } from '../dtos/solveMap.dto';
import { ApiTags, ApiOperation, ApiBasicAuth } from '@nestjs/swagger';
import { WipeMapRequest } from '../dtos/wipeMap.dto';
import { ApiKeyGuard } from '../../authGuard';

@Controller('/megaverses')
@ApiBasicAuth('api-key')
@UseGuards(ApiKeyGuard)
@ApiTags('Megaverses')
export class MegaverseController {
  constructor(private readonly megaversesService: MegaversesService) {}

  @Version('1')
  @ApiBasicAuth('api-key')
  @Post()
  @ApiOperation({
    description:
      'This endpoint is going to create the megaverse for a given candidate id on the payload.',
  })
  solveMap(@Body() { candidateId }: SolveMapRequest): Promise<void> {
    return this.megaversesService.solveMap(candidateId);
  }
}
