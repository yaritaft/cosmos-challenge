import { Injectable } from '@nestjs/common';
import { CrossmintClient } from '../../core/clients/crossmint/crossmint';
import { EraseSoloonRequest } from '../../core/clients/crossmint/dtos/eraseSoloon.dto';
import { EraseComethRequest } from '../../core/clients/crossmint/dtos/eraseCometh.dto';
import { ErasePolyanetRequest } from '../../core/clients/crossmint/dtos/erasePolyanet.dto';
import { CreateSoloonRequest } from '../../core/clients/crossmint/dtos/createSoloon.dto';
import { CreateComethRequest } from '../../core/clients/crossmint/dtos/createCometh.dto';
import {
  GetCurrentMapRequest,
  GetCurrentMapResponse,
} from '../../core/clients/crossmint/dtos/getCurrentMap.dto';
import {
  GetGoalMapRequest,
  GetGoalMapResponse,
} from '../../core/clients/crossmint/dtos/getGoalMap.dto';
import { CreatePolyanetRequest } from '../../core/clients/crossmint/dtos/createPolyanet.dto';

@Injectable()
export class CosmosRepository {
  constructor(private readonly crossmintClient: CrossmintClient) {}

  createPolyanet(createPolyanetRequest: CreatePolyanetRequest): Promise<void> {
    return this.crossmintClient.createPolyanet(createPolyanetRequest);
  }

  createCometh(createComethRequest: CreateComethRequest): Promise<void> {
    return this.crossmintClient.createCometh(createComethRequest);
  }

  createSoloon(createSoloonRequest: CreateSoloonRequest): Promise<void> {
    return this.crossmintClient.createSoloon(createSoloonRequest);
  }

  erasePolyanets(erasePolyanetRequest: ErasePolyanetRequest): Promise<void> {
    return this.crossmintClient.erasePolyanets(erasePolyanetRequest);
  }

  eraseCometh(eraseComethRequest: EraseComethRequest): Promise<void> {
    return this.crossmintClient.eraseCometh(eraseComethRequest);
  }

  eraseSoloon(eraseSoloonRequest: EraseSoloonRequest): Promise<void> {
    return this.crossmintClient.eraseSoloon(eraseSoloonRequest);
  }

  getGoal(getGoalMapRequest: GetGoalMapRequest): Promise<GetGoalMapResponse> {
    return this.crossmintClient.getGoal(getGoalMapRequest);
  }

  getCurrentMap(
    getCurrentMapRequest: GetCurrentMapRequest,
  ): Promise<GetCurrentMapResponse> {
    return this.crossmintClient.getCurrentMap(getCurrentMapRequest);
  }
}
