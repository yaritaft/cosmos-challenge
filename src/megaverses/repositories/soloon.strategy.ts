import { CrossmintClient } from '../../core/clients/crossmint/crossmint.client';
import { CreateSoloonRequest } from '../../core/clients/crossmint/dtos/createSoloon.dto';
import { EraseSoloonRequest } from '../../core/clients/crossmint/dtos/eraseSoloon.dto';
import {
  BaseElementStrategy,
  CreateElement,
  EraseElement,
} from './base.strategy';

export class SoloonsStrategy implements BaseElementStrategy {
  constructor(private readonly crossmintClient: CrossmintClient) {}
  create(createSoloonRequest: CreateElement): Promise<void> {
    return this.crossmintClient.createSoloon(
      createSoloonRequest as CreateSoloonRequest,
    );
  }

  erase(eraseElementRequest: EraseElement): Promise<void> {
    return this.crossmintClient.eraseSoloon(
      eraseElementRequest as EraseSoloonRequest,
    );
  }
}
