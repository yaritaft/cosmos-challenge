import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async solveMapPoly(): Promise<void> {
    const candidateId = '3b2e6a67-9043-48e0-9fd8-3fe7cbe04962';
    const urlGoal = `https://challenge.crossmint.io/api/map/${candidateId}/goal`;

    const baseUrl = 'https://challenge.crossmint.io/api';

    const urlsParams = {
      POLYANET: { url: '/polyanets' },
      RED_SOLOON: { color: 'red', url: '/soloons' },
      BLUE_SOLOON: { color: 'blue', url: '/soloons' },
      PURPLE_SOLOON: { color: 'purple', url: '/soloons' },
      WHITE_SOLOON: { color: 'white', url: '/soloons' },
      DOWN_COMETH: { direction: 'down', url: '/comeths' },
      UP_COMETH: { direction: 'up', url: '/comeths' },
      LEFT_COMETH: { direction: 'left', url: '/comeths' },
      RIGHT_COMETH: { direction: 'right', url: '/comeths' },
    };

    const goalMatrix = await this.httpService.get(urlGoal).toPromise();

    for (const [row, value] of Object.entries(goalMatrix.data.goal)) {
      for (const [column, value2] of Object.entries(value)) {
        if (value2 === 'SPACE') {
          continue;
        }

        const { url, color, direction } = urlsParams[value2];
        try {
          await this.httpService
            .post(`${baseUrl}${url}`, {
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
    }
  }

  async wipeMapPoly(): Promise<void> {
    const candidateId = '3b2e6a67-9043-48e0-9fd8-3fe7cbe04962';
    const urlMap = `https://challenge.crossmint.io/api/map/${candidateId}`;
    const urlPolyPosition = 'https://challenge.crossmint.io/api/polyanets';
    const goalMatrix = await this.httpService.get(urlMap).toPromise();

    for (const [row, value] of Object.entries(goalMatrix.data.map.content)) {
      for (const [column, value2] of Object.entries(value)) {
        if (value2 !== null) {
          try {
            const result = await this.httpService
              .delete(urlPolyPosition, {
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
    }
  }
}
