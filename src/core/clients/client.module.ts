import { Module } from '@nestjs/common';
import { ClientApiClient } from './clientApi/clientApi.client';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ClientApiClient],
  exports: [ClientApiClient],
})
export class ClientModule {}
