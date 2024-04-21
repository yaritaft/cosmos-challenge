import { Module } from '@nestjs/common';
import { CrossmintClient } from './crossmint/crossmint.client';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CrossmintClient],
  exports: [CrossmintClient],
})
export class ClientModule {}
