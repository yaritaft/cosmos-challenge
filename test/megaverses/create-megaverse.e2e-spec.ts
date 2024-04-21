import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpMockBuilder } from '../helpers/http-mock.helper.test';
import { HttpService } from '@nestjs/axios';
import { apiKey } from 'config';
import { AppMockHelper } from '../helpers/app-helper.test';
import { CrossmintClient } from '../../src/core/clients/crossmint/crossmint.client';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('Create Megaverses (e2e)', () => {
  let app: INestApplication;
  let mockHelper: HttpMockBuilder;
  let httpService: HttpService;
  let crossmintClient: CrossmintClient;

  beforeEach(async () => {
    app = await AppMockHelper.createApp();
    mockHelper = new HttpMockBuilder(app.get(HttpService));
    crossmintClient = app.get(CrossmintClient);
    httpService = app.get(HttpService);

    await app.init();
  });
  describe('Create Megaverses', () => {
    const candidateId = 'CANDIDATE_ID';

    it('401: / (POST) Unauthorized attempt. With no API KEY.', () => {
      return request(app.getHttpServer())
        .post('/megaverses/')
        .expect(401)
        .expect({
          message: 'API key is missing.',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('401: / (POST) Unauthorized attempt. With wrong API KEY.', () => {
      return request(app.getHttpServer())
        .post('/megaverses/')
        .set({ 'api-key': 'WRONT_API_KEY' })
        .expect(401)
        .expect({
          message: 'Invalid API key.',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('500: / (POST) External API is not working properly.', () => {
      mockHelper.addGetMock(`/map/${candidateId}/goal`, {}, true, 500, 'aa');

      return request(app.getHttpServer())
        .post('/megaverses')
        .set({ 'api-key': apiKey })
        .expect(500);
    });

    // it('201: / (POST) With some 429 errors before getting 201 from External API to test retries.', () => {
    //   return request(app.getHttpServer())
    //     .get('/')
    // .set({ 'api-key': apiKey })
    //     .expect(200)
    //     .expect('Hello World!');
    // });

    it.only('201: / (POST) Succesfully create a megaverse', async () => {
      // RC: Right Cometh S: Space PSO: Purple Soloon P: Polyanet
      // Megaverse goal: 1 Right Cometh 1 Polyanet 1 Purple Soloon and 6 Spaces that means no call
      // [P S S ]
      // [S RC S ]
      // [S S PSO ]

      // mockHelper.addGetMock(
      //   `/map/${candidateId}/goal`,
      //   {
      //     data: {
      //       goal: [
      //         ['POLYANET', 'SPACE', 'SPACE'],
      //         ['SPACE', 'RIGHT_COMETH', 'SPACE'],
      //         ['SPACE', 'SPACE', 'PURPLE_SOLOON'],
      //       ],
      //     },
      //     status: 200,
      //   },
      //   false,
      //   200,
      //   '',
      //   { headers: { 'api-key': apiKey } },
      // );

      //   {}, //   { row: '1', column: '1', direction: 'right', candidateId }, //   `/comeths`, // mockHelper.addPostMock(
      //   false,
      //   201,
      // );
      // mockHelper.addPostMock(
      //   `/soloons`,
      //   { row: '2', column: '2', color: 'purple', candidateId },
      //   {},
      //   false,
      //   201,
      // );
      // mockHelper.addPostMock(
      //   `/polyanets`,
      //   { row: '0', column: '0', candidateId },
      //   {},
      //   false,
      //   201,
      // );

      // mockHelper.build();

      // jest
      //   .spyOn(httpService, 'get')
      //   .mockImplementation((url: string, config?: any): any => {
      //     console.error(url, config);
      //     console.error('YARI');
      //   });
      const response: any = {
        data: {
          goal: [
            ['POLYANET', 'SPACE', 'SPACE'],
            ['SPACE', 'RIGHT_COMETH', 'SPACE'],
            ['SPACE', 'SPACE', 'PURPLE_SOLOON'],
          ],
        },
        config: { url: 'http://localhost:3000/mockUrl' } as any,
        status: 200,
        statusText: 'OK',
      };
      const getGoal = jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(response) as never);
      const createElement = jest
        .spyOn(httpService, 'post')
        .mockReturnValue(of(response) as never);

      // jest.spyOn(crossmintClient, 'createSoloon').mockResolvedValue({
      //   goal: [
      //     ['POLYANET', 'SPACE', 'SPACE'],
      //     ['SPACE', 'RIGHT_COMETH', 'SPACE'],
      //     ['SPACE', 'SPACE', 'PURPLE_SOLOON'],
      //   ],
      // } as any);

      // jest.spyOn(crossmintClient, 'createPolyanet').mockResolvedValue({
      //   goal: [
      //     ['POLYANET', 'SPACE', 'SPACE'],
      //     ['SPACE', 'RIGHT_COMETH', 'SPACE'],
      //     ['SPACE', 'SPACE', 'PURPLE_SOLOON'],
      //   ],
      // } as any);

      // jest
      //   .spyOn(httpService, 'post')
      //   .mockResolvedValue({ a: 4 } as unknown as never);

      await request(app.getHttpServer())
        .post('/v1/megaverses')
        .send({ candidateId })
        .set({ 'api-key': apiKey })
        .expect(201);

      expect(createElement).toHaveBeenCalledTimes(3);
      expect(createElement).toHaveBeenCalledWith('/polyanets', {
        row: '0',
        column: '0',
        candidateId,
      });
      expect(getGoal).toHaveBeenCalledTimes(1);
    });
  });
});
