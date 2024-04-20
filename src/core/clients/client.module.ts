import { Module } from '@nestjs/common';
import { AxiosRetryModule } from 'nestjs-axios-retry';
import axiosRetry from 'axios-retry';
import { CrossmintClient } from './crossmint/crossmint.client';

@Module({
  imports: [
    AxiosRetryModule.forRoot({
      axiosRetryConfig: {
        retries: 7,
        retryDelay: axiosRetry.exponentialDelay,
        shouldResetTimeout: true,
        retryCondition: (error) => error.response.status === 429,
        onRetry: (retryCount) => {
          console.log(`Retrying request attempt ${retryCount}`);
        },
      },
    }),
  ],
  providers: [CrossmintClient],
  exports: [CrossmintClient],
})
export class ClientModule {}