import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { crossmintAPI as crossmintAPIConfig } from 'config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CrossmintClient {
  private baseUrl: string = crossmintAPIConfig.baseUrl;
  constructor(private readonly httpService: HttpService) {}

  async createPolyanet() {
    try {
      await this.httpService
        .post(`${this.baseUrl}$/polyanets`, {
          candidateId,
          row,
          column,
          color,
          direction,
        })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async createCometh() {
    try {
      await this.httpService
        .post(`${this.baseUrl}/comeths`, {
          candidateId,
          row,
          column,
          color,
          direction,
        })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async createSoloon() {
    try {
      await this.httpService
        .post(`${this.baseUrl}/soloons`, {
          candidateId,
          row,
          column,
          color,
          direction,
        })
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async erasePolyanets() {
    try {
      const result = await this.httpService
        .delete(`${this.baseUrl}/polyanets`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            candidateId,
            row,
            column,
          },
        })
        .toPromise();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async eraseCometh() {
    try {
      const result = await this.httpService
        .delete(`${this.baseUrl}/comeths`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            candidateId,
            row,
            column,
          },
        })
        .toPromise();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async eraseSoloon() {
    try {
      const result = await this.httpService
        .delete(`${this.baseUrl}/soloons`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            candidateId,
            row,
            column,
          },
        })
        .toPromise();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async getGoal() {
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/map/${candidateId}/goal,`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            candidateId,
            row,
            column,
          },
        })
        .toPromise();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentMap() {
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/map/${candidateId},`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            candidateId,
            row,
            column,
          },
        })
        .toPromise();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
