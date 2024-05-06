import { ClientApiClient } from '../../core/clients/clientApi/clientApi.client';
import {
  BaseElementStrategy,
  CreateElement,
  EraseElement,
} from './base.strategy';
import { CreatePolyanetRequest } from '../../core/clients/clientApi/dtos/createPolyanet.dto';
import { ErasePolyanetRequest } from '../../core/clients/clientApi/dtos/erasePolyanet.dto';

export class PolyanetsStrategy implements BaseElementStrategy {
  constructor(private readonly ClientApiClient: ClientApiClient) {}
  create(createPolyanetRequest: CreateElement): Promise<void> {
    return this.ClientApiClient.createPolyanet(
      createPolyanetRequest as CreatePolyanetRequest,
    );
  }

  erase(eraseElementRequest: EraseElement): Promise<void> {
    return this.ClientApiClient.erasePolyanets(
      eraseElementRequest as ErasePolyanetRequest,
    );
  }
}
