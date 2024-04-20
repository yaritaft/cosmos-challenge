import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';

@Module({
  imports: [ClientModule],
  exports: [ClientModule],
})
export class CoreModule {}
