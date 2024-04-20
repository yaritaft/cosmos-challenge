import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosError } from 'axios';
import * as _ from 'lodash';

export class HttpMockBuilder {
  private getMocks: { [url: string]: any } = {};
  private deleteMocks: { [url: string]: any } = {};
  private postMocks: { [url: string]: any } = {};
  private patchMocks: { [url: string]: any } = {};

  private _calledGetMocks: { [url: string]: number } = {};
  private _calledPostMocks: { [url: string]: number } = {};

  constructor(public httpService: HttpService) {}

  addGetMock(
    url: string,
    data: any,
    isError = false,
    status = 200,
    statusText = '',
    config = null,
  ) {
    if (isError) {
      this.getMocks[url] = {
        config,
        code: status.toString(),
        response: {
          data,
          status,
          statusText,
          headers: {},
          config: {},
        },
        isAxiosError: true,
        toJSON: () => data,
      } as AxiosError;
    } else {
      this.getMocks[url] = {
        data,
        status,
        statusText,
        headers: {},
        config,
      };
    }
    this._calledGetMocks[url] = 0;
  }

  addPostMock(
    url: string,
    body: any,
    data: any,
    isError = false,
    status = 200,
    statusText = '',
    matchFn?: (body: any) => boolean,
  ) {
    if (isError) {
      this.postMocks[url] = {
        config: {},
        code: status.toString(),
        request: body,
        response: {
          data,
          status,
          statusText,
          headers: {},
          config: {},
        },
        isAxiosError: true,
        toJSON: () => data,
        matchFn,
      } as unknown as AxiosError;
    } else {
      this.postMocks[url] = {
        request: body,
        data,
        status,
        statusText,
        headers: {},
        config: {},
        matchFn,
      };
    }
    this._calledPostMocks[url] = 0;
  }

  addPatchMock(
    url: string,
    body: any,
    data: any,
    isError = false,
    status = 200,
    statusText = '',
  ) {
    if (isError) {
      this.patchMocks[url] = {
        config: {},
        code: status.toString(),
        request: body,
        response: {
          data,
          status,
          statusText,
          headers: {},
          config: {},
        },
        isAxiosError: true,
        toJSON: () => data,
      } as AxiosError;
    } else {
      this.patchMocks[url] = {
        request: body,
        data,
        status,
        statusText,
        headers: {},
        config: {},
      };
    }
  }

  addDeleteMock(
    url: string,
    data: any,
    isError = false,
    status = 200,
    statusText = '',
    config = null,
  ) {
    if (isError) {
      this.deleteMocks[url] = {
        config,
        code: status.toString(),
        response: {
          data,
          status,
          statusText,
          headers: {},
          config: {},
        },
        isAxiosError: true,
        toJSON: () => data,
      } as AxiosError;
    } else {
      this.deleteMocks[url] = {
        data,
        status,
        statusText,
        headers: {},
        config,
      };
    }
  }

  get calledGetMocks(): { [p: string]: any } {
    return this._calledGetMocks;
  }

  get calledPostMocks(): { [p: string]: any } {
    return this._calledPostMocks;
  }

  build() {
    jest
      .spyOn(this.httpService, 'get')
      .mockImplementation((url: string, config?: any) => {
        for (const mockUrl in this.getMocks) {
          const mock = this.getMocks[mockUrl];
          if (
            url.includes(mockUrl) &&
            (!mock.config || _.isMatch(config, mock.config))
          ) {
            this._calledGetMocks[mockUrl]++;
            const response = this.getMocks[mockUrl];
            if (response.isAxiosError) {
              throw response;
            } else {
              return of(this.getMocks[mockUrl]);
            }
          }
        }

        throw Error(`No Implementation for GET - ${url}`);
      });

    jest
      .spyOn(this.httpService, 'delete')
      .mockImplementation((url: string, config?: any) => {
        for (const mockUrl in this.deleteMocks) {
          const mock = this.deleteMocks[mockUrl];
          if (
            url.includes(mockUrl) &&
            (!mock.config || _.isMatch(config, mock.config))
          ) {
            const response = this.deleteMocks[mockUrl];
            if (response.isAxiosError) {
              throw response;
            } else {
              return of(this.deleteMocks[mockUrl]);
            }
          }
        }

        throw Error(`No Implementation for DELETE - ${url}`);
      });

    jest
      .spyOn(this.httpService, 'post')
      .mockImplementation((url: string, body: any) => {
        for (const mockUrl in this.postMocks) {
          const mock = this.postMocks[mockUrl];
          if (
            url.includes(mockUrl) &&
            (mock.matchFn ? mock.matchFn(body) : _.isMatch(body, mock.request))
          ) {
            this._calledPostMocks[mockUrl]++;
            const response = this.postMocks[mockUrl];
            if (response.isAxiosError) {
              throw response;
            } else {
              return of(this.postMocks[mockUrl]);
            }
          }
        }

        throw Error(`No Implementation for POST - ${url}`);
      });

    jest
      .spyOn(this.httpService, 'patch')
      .mockImplementation((url: string, body: any) => {
        for (const mockUrl in this.patchMocks) {
          if (
            url.includes(mockUrl) &&
            _.isMatch(body, this.patchMocks[mockUrl].request)
          ) {
            const response = this.patchMocks[mockUrl];
            if (response.isAxiosError) {
              throw response;
            } else {
              return of(this.patchMocks[mockUrl]);
            }
          }
        }

        throw Error(`No Implementation for PATCH - ${url}`);
      });
  }
}
