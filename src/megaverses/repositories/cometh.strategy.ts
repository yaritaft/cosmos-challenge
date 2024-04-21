import { CrossmintClient } from '../../core/clients/crossmint/crossmint.client';
import {
  BaseElementStrategy,
  CreateElement,
  EraseElement,
} from './base.strategy';
import { CreateComethRequest } from '../../core/clients/crossmint/dtos/createCometh.dto';
import { EraseComethRequest } from '../../core/clients/crossmint/dtos/eraseCometh.dto';

export class ComethsStrategy implements BaseElementStrategy {
  constructor(private readonly crossmintClient: CrossmintClient) {}
  create(createComethRequest: CreateElement): Promise<void> {
    return this.crossmintClient.createCometh(
      createComethRequest as CreateComethRequest,
    );
  }

  erase(eraseElementRequest: EraseElement): Promise<void> {
    return this.crossmintClient.eraseCometh(
      eraseElementRequest as EraseComethRequest,
    );
  }
}
