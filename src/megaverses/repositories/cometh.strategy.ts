import { ClientApiClient } from '../../core/clients/clientApi/clientApi.client';
import {
  BaseElementStrategy,
  CreateElement,
  EraseElement,
} from './base.strategy';
import { CreateComethRequest } from '../../core/clients/clientApi/dtos/createCometh.dto';
import { EraseComethRequest } from '../../core/clients/clientApi/dtos/eraseCometh.dto';

export class ComethsStrategy implements BaseElementStrategy {
  constructor(private readonly ClientApiClient: ClientApiClient) {}
  create(createComethRequest: CreateElement): Promise<void> {
    return this.ClientApiClient.createCometh(
      createComethRequest as CreateComethRequest,
    );
  }

  erase(eraseElementRequest: EraseElement): Promise<void> {
    return this.ClientApiClient.eraseCometh(
      eraseElementRequest as EraseComethRequest,
    );
  }
}
