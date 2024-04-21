import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { MegaverseController } from './controllers/megaverses.controller';
import { MegaversesService } from './services/megaverses.service';
import { MegaversesRepository } from './repositories/megaverses.repository';

@Module({
  imports: [CoreModule],
  controllers: [MegaverseController],
  providers: [MegaversesRepository, MegaversesService],
})
export class MegaversesModule {}
