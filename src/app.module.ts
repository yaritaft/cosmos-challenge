import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AxiosRetryModule } from 'nestjs-axios-retry';
// import axiosRetry from 'axios-retry';
import { CosmosModule } from './cosmos/cosmos.module';

@Module({
  imports: [
    // AxiosRetryModule.forRoot({
    //   axiosRetryConfig: {
    //     retries: 7,
    //     retryDelay: axiosRetry.exponentialDelay,
    //     shouldResetTimeout: true,
    //     retryCondition: (error) => error.response.status === 429,
    //     onRetry: (retryCount) => {
    //       console.log(`Retrying request attempt ${retryCount}`);
    //     },
    //   },
    // }), // TODO: ERASE THIS ONCE WE VALIDATE NEW CODE IS WORKING
    CosmosModule,
  ],
  // controllers: [AppController], // TODO: ERASE THIS ONCE WE VALIDATE NEW CODE IS WORKING
  // providers: [AppService], // TODO: ERASE THIS ONCE WE VALIDATE NEW CODE IS WORKING
})
export class AppModule {}
