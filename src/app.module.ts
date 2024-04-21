import { Module } from '@nestjs/common';
import { MegaversesModule } from './megaverses/megaverses.module';

@Module({
  imports: [MegaversesModule],
})
export class AppModule {}
