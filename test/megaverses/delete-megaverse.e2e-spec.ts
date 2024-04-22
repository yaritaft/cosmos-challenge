import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpMockBuilder } from '../helpers/http-mock.helper.test';
import { HttpService } from '@nestjs/axios';
import { apiKey, crossmintAPI } from 'config';
import { of } from 'rxjs';
import { AppMockHelper } from '../helpers/app-helper.test';

describe('Create Megaverses (e2e)', () => {
  let app: INestApplication;
  let mockHelper: HttpMockBuilder;
  let httpService: HttpService;

  beforeEach(async () => {
    app = await AppMockHelper.createApp();
    mockHelper = new HttpMockBuilder(app.get(HttpService));
    httpService = app.get(HttpService);

    await app.init();
  });
  describe('Create Megaverses', () => {
    const candidateId = 'CANDIDATE_ID';

    it('401: / (DELETE) Unauthorized attempt. With no API KEY.', () => {
      return request(app.getHttpServer())
        .delete('/v1/megaverses')
        .expect(401)
        .expect({
          message: 'API key is missing.',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('401: / (DELETE) Unauthorized attempt. With wrong API KEY.', () => {
      return request(app.getHttpServer())
        .delete('/v1/megaverses')
        .set({ 'api-key': 'WRONT_API_KEY' })
        .expect(401)
        .expect({
          message: 'Invalid API key.',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('500: / (DELETE) External API is not working properly.', () => {
      mockHelper.addGetMock(`/map/${candidateId}`, {}, true, 500, 'aa');

      return request(app.getHttpServer())
        .delete('/v1/megaverses')
        .set({ 'api-key': apiKey })
        .expect(500);
    });

    it('201: / (DELETE) Succesfully create a megaverse with multiple elements', async () => {
      /* RC: Right Cometh S: Space PSO: Purple Soloon P: Polyanet
      Megaverse goal: 1 Right Cometh 1 Polyanet 1 Purple Soloon and 6 Spaces that means no call
      [P S S ]
      [S RC S ]
      [S S PSO ]
      */

      const response = {
        data: {
          map: {
            content: [
              [{ type: 0 }, null, null],
              [null, { type: 1, direction: 'purple' }, null],
              [null, null, { type: 2, color: 'right' }],
            ],
          },
        },
        config: {} as any,
        status: 200,
        statusText: 'OK',
      };
      const getGoal = jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(response) as never);
      const eraseElement = jest
        .spyOn(httpService, 'delete')
        .mockReturnValue(of({}) as never);

      await request(app.getHttpServer())
        .delete('/v1/megaverses')
        .send({ candidateId })
        .set({ 'api-key': apiKey })
        .expect(200);

      expect(eraseElement).toHaveBeenCalledTimes(3);
      expect(eraseElement).toHaveBeenNthCalledWith(
        1,
        `${crossmintAPI.baseUrl}/polyanets`,
        {
          data: {
            row: '0',
            column: '0',
            candidateId,
          },
        },
      );
      expect(eraseElement).toHaveBeenNthCalledWith(
        3,
        `${crossmintAPI.baseUrl}/comeths`,
        {
          data: {
            row: '2',
            column: '2',
            candidateId,
          },
        },
      );
      expect(eraseElement).toHaveBeenNthCalledWith(
        2,
        `${crossmintAPI.baseUrl}/soloons`,
        {
          data: {
            row: '1',
            column: '1',
            candidateId,
          },
        },
      );

      expect(getGoal).toHaveBeenCalledTimes(1);
    });
  });
});
