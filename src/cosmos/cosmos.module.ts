import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { CosmosController } from './controllers/cosmos.controller';
import { CosmosService } from './services/cosmos.service';
import { CosmosRepository } from './repositories/cosmos.repository';

@Module({
  imports: [CoreModule],
  controllers: [CosmosController],
  providers: [CoreModule, CosmosRepository, CosmosService],
})
export class CosmosModule {}
