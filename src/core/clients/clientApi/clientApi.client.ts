import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { clientAPI as clientAPIConfig, maxRetries } from 'config';
import { firstValueFrom } from 'rxjs';
import { CreateComethRequest } from './dtos/createCometh.dto';
import { CreateSoloonRequest } from './dtos/createSoloon.dto';
import { ErasePolyanetRequest } from './dtos/erasePolyanet.dto';
import { EraseComethRequest } from './dtos/eraseCometh.dto';
import { EraseSoloonRequest } from './dtos/eraseSoloon.dto';
import { CreatePolyanetRequest } from './dtos/createPolyanet.dto';
import { GetGoalMapRequest, GetGoalMapResponse } from './dtos/getGoalMap.dto';
import {
  GetCurrentMapRequest,
  GetCurrentMapResponse,
} from './dtos/getCurrentMap.dto';
import { setTimeout as sleep } from 'node:timers/promises';

const handleError = (error: any) => {
  throw error;
};

@Injectable()
export class ClientApiClient {
  private baseUrl: string = clientAPIConfig.baseUrl;
  constructor(private readonly httpService: HttpService) {}

  private async retryRequest(request, args, counter): Promise<void> {
    try {
      return await request(args);
    } catch (error) {
      if (error.response.status === 429 && counter < Number(maxRetries)) {
        await sleep(1000 * counter);
        console.info(`Attempt number: ${counter}`);
        return await this.retryRequest(request, args, counter + 1);
      } else {
        throw error;
      }
    }
  }

  async createPolyanet(createPolyanetRequest: CreatePolyanetRequest) {
    const call$ = this.httpService.post<void>(
      `${this.baseUrl}/polyanets`,
      createPolyanetRequest,
    );

    return await this.retryRequest(firstValueFrom, call$, 0);
  }

  async createCometh(createComethRequest: CreateComethRequest) {
    const call$ = this.httpService.post<void>(
      `${this.baseUrl}/comeths`,
      createComethRequest,
    );
    return await this.retryRequest(firstValueFrom, call$, 0);
  }

  async createSoloon(createSoloonRequest: CreateSoloonRequest) {
    const call$ = this.httpService.post<void>(
      `${this.baseUrl}/soloons`,
      createSoloonRequest,
    );
    return await this.retryRequest(firstValueFrom, call$, 0);
  }

  async erasePolyanets(erasePolyanetRequest: ErasePolyanetRequest) {
    const call$ = this.httpService.delete<void>(`${this.baseUrl}/polyanets`, {
      data: erasePolyanetRequest,
    });
    return await this.retryRequest(firstValueFrom, call$, 0);
  }

  async eraseCometh(eraseComethRequest: EraseComethRequest) {
    const call$ = this.httpService.delete<void>(`${this.baseUrl}/comeths`, {
      data: eraseComethRequest,
    });
    return await this.retryRequest(firstValueFrom, call$, 0);
  }

  async eraseSoloon(eraseSoloonRequest: EraseSoloonRequest) {
    const call$ = this.httpService.delete<void>(`${this.baseUrl}/soloons`, {
      data: eraseSoloonRequest,
    });
    return await this.retryRequest(firstValueFrom, call$, 0);
  }

  async getGoal(getGoalMapRequest: GetGoalMapRequest) {
    try {
      const call$ = this.httpService.get<GetGoalMapResponse>(
        `${this.baseUrl}/map/${getGoalMapRequest.candidateId}/goal`,
      );
      const response = await firstValueFrom(call$);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getCurrentMap(
    getCurrentMapRequest: GetCurrentMapRequest,
  ): Promise<GetCurrentMapResponse> {
    try {
      const call$ = this.httpService.get<GetCurrentMapResponse>(
        `${this.baseUrl}/map/${getCurrentMapRequest.candidateId}`,
      );
      const { data } = await firstValueFrom(call$);
      return data;
    } catch (error) {
      handleError(error);
    }
  }
}
