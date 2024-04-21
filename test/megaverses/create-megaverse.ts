import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { HttpMockBuilder } from '../helpers/http-mock.helper.test';
import { HttpService } from '@nestjs/axios';
import { apiKey } from 'config';
import { AppMockHelper } from '../helpers/app-helper.test';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('Create Megaverses (e2e)', () => {
  let app: INestApplication;
  let mockHelper: HttpMockBuilder;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.enableVersioning({
      type: VersioningType.URI,
    });

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

    it.only('201: / (POST) Succesfully create a megaverse', () => {
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

      jest
        .spyOn(httpService, 'get')
        .mockImplementation((url: string, config?: any): any => {
          console.error(url, config);
          console.error('YARI');
        });
      return request(app.getHttpServer())
        .post('/v1/megaverses/')
        .send({ candidateId })
        .set({ 'api-key': apiKey })
        .expect(201);
    });
  });
});
