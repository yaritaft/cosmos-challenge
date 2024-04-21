import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { crossmintAPI as crossmintAPIConfig, maxRetries } from 'config';
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
export class CrossmintClient {
  private baseUrl: string = crossmintAPIConfig.baseUrl;
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
    try {
      const call$ = this.httpService.delete<void>(`${this.baseUrl}/polyanets`, {
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        data: {
          erasePolyanetRequest,
        },
      });
      const { data } = await firstValueFrom(call$);
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async eraseCometh(eraseComethRequest: EraseComethRequest) {
    try {
      const call$ = this.httpService.delete<void>(`${this.baseUrl}/comeths`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          eraseComethRequest,
        },
      });
      const { data } = await firstValueFrom(call$);
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async eraseSoloon(eraseSoloonRequest: EraseSoloonRequest) {
    try {
      const call$ = this.httpService.delete<void>(`${this.baseUrl}/soloons`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          eraseSoloonRequest,
        },
      });
      const { data } = await firstValueFrom(call$);
      return data;
    } catch (error) {
      handleError(error);
    }
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
        `${this.baseUrl}/map/${getCurrentMapRequest.candidateId},`,
      );
      const { data } = await firstValueFrom(call$);
      return data;
    } catch (error) {
      handleError(error);
    }
  }
}
