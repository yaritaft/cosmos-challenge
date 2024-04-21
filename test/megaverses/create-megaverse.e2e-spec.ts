import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpMockBuilder } from '../helpers/http-mock.helper.test';
import { HttpService } from '@nestjs/axios';
import { apiKey, crossmintAPI } from 'config';
import { of } from 'rxjs';
import { AppMockHelper } from '../helpers/app-helper.test';
import { AxiosError } from 'axios';

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

    it('401: / (POST) Unauthorized attempt. With no API KEY.', () => {
      return request(app.getHttpServer())
        .post('/v1/megaverses')
        .expect(401)
        .expect({
          message: 'API key is missing.',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('401: / (POST) Unauthorized attempt. With wrong API KEY.', () => {
      return request(app.getHttpServer())
        .post('/v1/megaverses')
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
        .post('/v1/megaverses')
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

    it('201: / (POST) Succesfully create a megaverse with only one element', async () => {
      // RC: Right Cometh S: Space PSO: Purple Soloon P: Polyanet
      // Megaverse goal: 1 Right Cometh 1 Polyanet 1 Purple Soloon and 6 Spaces that means no call
      // [S S S ]
      // [S S S ]
      // [S S PSO ]

      const response = {
        data: {
          goal: [
            ['SPACE', 'SPACE', 'SPACE'],
            ['SPACE', 'SPACE', 'SPACE'],
            ['SPACE', 'SPACE', 'PURPLE_SOLOON'],
          ],
        },
        config: {} as any,
        status: 200,
        statusText: 'OK',
      };
      const getGoal = jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(response) as never);
      const createElement = jest
        .spyOn(httpService, 'post')
        .mockReturnValue(of({}) as never);

      await request(app.getHttpServer())
        .post('/v1/megaverses')
        .send({ candidateId })
        .set({ 'api-key': apiKey })
        .expect(201);

      expect(createElement).toHaveBeenCalledTimes(1);
      expect(createElement).toHaveBeenNthCalledWith(
        1,
        `${crossmintAPI.baseUrl}/soloons`,
        {
          row: '2',
          column: '2',
          candidateId,
          color: 'purple',
        },
      );

      expect(getGoal).toHaveBeenCalledTimes(1);
    });

    it('201: / (POST) Succesfully create a megaverse', async () => {
      // RC: Right Cometh S: Space PSO: Purple Soloon P: Polyanet
      // Megaverse goal: 1 Right Cometh 1 Polyanet 1 Purple Soloon and 6 Spaces that means no call
      // [P S S ]
      // [S RC S ]
      // [S S PSO ]

      const response = {
        data: {
          goal: [
            ['POLYANET', 'SPACE', 'SPACE'],
            ['SPACE', 'RIGHT_COMETH', 'SPACE'],
            ['SPACE', 'SPACE', 'PURPLE_SOLOON'],
          ],
        },
        config: {} as any,
        status: 200,
        statusText: 'OK',
      };
      const getGoal = jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(response) as never);
      const createElement = jest
        .spyOn(httpService, 'post')
        .mockReturnValue(of({}) as never);

      await request(app.getHttpServer())
        .post('/v1/megaverses')
        .send({ candidateId })
        .set({ 'api-key': apiKey })
        .expect(201);

      expect(createElement).toHaveBeenCalledTimes(3);
      expect(createElement).toHaveBeenNthCalledWith(
        1,
        `${crossmintAPI.baseUrl}/polyanets`,
        {
          row: '0',
          column: '0',
          candidateId,
        },
      );
      expect(createElement).toHaveBeenNthCalledWith(
        2,
        `${crossmintAPI.baseUrl}/comeths`,
        {
          row: '1',
          column: '1',
          candidateId,
          direction: 'right',
        },
      );
      expect(createElement).toHaveBeenNthCalledWith(
        3,
        `${crossmintAPI.baseUrl}/soloons`,
        {
          row: '2',
          column: '2',
          candidateId,
          color: 'purple',
        },
      );

      expect(getGoal).toHaveBeenCalledTimes(1);
    });

    it('201: / (POST) Succesfully create a megaverse with some 429 errors and then successfully retried.', async () => {
      // RC: Right Cometh S: Space PSO: Purple Soloon P: Polyanet
      // Megaverse goal: 1 Right Cometh 1 Polyanet 1 Purple Soloon and 6 Spaces that means no call
      // [P S S ]
      // [S RC S ]
      // [S S PSO ]

      const response = {
        data: {
          goal: [
            ['POLYANET', 'SPACE', 'SPACE'],
            ['SPACE', 'RIGHT_COMETH', 'SPACE'],
            ['SPACE', 'SPACE', 'PURPLE_SOLOON'],
          ],
        },
        config: {} as any,
        status: 200,
        statusText: 'OK',
      };

      const responseTooManyRequests = {
        data: {},
        config: {} as any,
        status: 429,
        statusText: 'OK',
      };
      const getGoal = jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(response) as never);
      let counter = 0;
      const createElement = jest
        .spyOn(httpService, 'post')
        .mockImplementation((url: string) => {
          if (url.includes('/polyanets')) {
            while (counter < 1) {
              counter++; // Two times is going to thrown 429 for too many requests the third time will be okay.
              const axiosError = new AxiosError('aa');
              axiosError.status = 429;
              throw axiosError as never;
            }
            return of({}) as never;
          }
        });

      await request(app.getHttpServer())
        .post('/v1/megaverses')
        .send({ candidateId })
        .set({ 'api-key': apiKey })
        .expect(201);

      expect(createElement).toHaveBeenCalledTimes(5);
      expect(createElement).toHaveBeenNthCalledWith(1, '/polyanets', {
        row: '0',
        column: '0',
        candidateId,
      });
      expect(createElement).toHaveBeenNthCalledWith(2, '/polyanets', {
        row: '0',
        column: '0',
        candidateId,
      });
      expect(createElement).toHaveBeenNthCalledWith(3, '/polyanets', {
        row: '0',
        column: '0',
        candidateId,
      });
      expect(createElement).toHaveBeenNthCalledWith(4, '/comeths', {
        row: '1',
        column: '1',
        candidateId,
        direction: 'right',
      });
      expect(createElement).toHaveBeenNthCalledWith(5, '/soloons', {
        row: '2',
        column: '2',
        candidateId,
        color: 'purple',
      });

      expect(getGoal).toHaveBeenCalledTimes(1);
    });
  });
});
