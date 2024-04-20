import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { crossmintAPI as crossmintAPIConfig } from 'config';
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

@Injectable()
export class CrossmintClient {
  private baseUrl: string = crossmintAPIConfig.baseUrl;
  constructor(private readonly httpService: HttpService) {}

  async createPolyanet(createPolyanetRequest: CreatePolyanetRequest) {
    try {
      const call$ = this.httpService.post<void>(
        `${this.baseUrl}$/polyanets`,
        createPolyanetRequest,
      );

      const { data } = await firstValueFrom(call$);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async createCometh(createComethRequest: CreateComethRequest) {
    try {
      const call$ = this.httpService.post<void>(`${this.baseUrl}/comeths`, {
        createComethRequest,
      });
      const { data } = await firstValueFrom(call$);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async createSoloon(createSoloonRequest: CreateSoloonRequest) {
    try {
      const call$ = this.httpService.post<void>(`${this.baseUrl}/soloons`, {
        createSoloonRequest,
      });
      const { data } = await firstValueFrom(call$);
      return data;
    } catch (error) {
      console.log(error);
    }
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  }

  async getGoal(getGoalMapRequest: GetGoalMapRequest) {
    try {
      const call$ = this.httpService.get<GetGoalMapResponse>(
        `${this.baseUrl}/map/${getGoalMapRequest.candidateId}/goal,`,
      );
      const { data } = await firstValueFrom(call$);
      return data;
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
}
