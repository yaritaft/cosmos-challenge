import { ClientApiClient } from '../../core/clients/clientApi/clientApi.client';
import { CreateSoloonRequest } from '../../core/clients/clientApi/dtos/createSoloon.dto';
import { EraseSoloonRequest } from '../../core/clients/clientApi/dtos/eraseSoloon.dto';
import {
  BaseElementStrategy,
  CreateElement,
  EraseElement,
} from './base.strategy';

export class SoloonsStrategy implements BaseElementStrategy {
  constructor(private readonly ClientApiClient: ClientApiClient) {}
  create(createSoloonRequest: CreateElement): Promise<void> {
    return this.ClientApiClient.createSoloon(
      createSoloonRequest as CreateSoloonRequest,
    );
  }

  erase(eraseElementRequest: EraseElement): Promise<void> {
    return this.ClientApiClient.eraseSoloon(
      eraseElementRequest as EraseSoloonRequest,
    );
  }
}
