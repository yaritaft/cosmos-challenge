import { CrossmintClient } from '../../core/clients/crossmint/crossmint.client';
import {
  BaseElementStrategy,
  CreateElement,
  EraseElement,
} from './base.strategy';
import { CreatePolyanetRequest } from '../../core/clients/crossmint/dtos/createPolyanet.dto';
import { ErasePolyanetRequest } from '../../core/clients/crossmint/dtos/erasePolyanet.dto';

export class PolyanetsStrategy implements BaseElementStrategy {
  constructor(private readonly crossmintClient: CrossmintClient) {}
  create(createPolyanetRequest: CreateElement): Promise<void> {
    return this.crossmintClient.createPolyanet(
      createPolyanetRequest as CreatePolyanetRequest,
    );
  }

  erase(eraseElementRequest: EraseElement): Promise<void> {
    return this.crossmintClient.erasePolyanets(
      eraseElementRequest as ErasePolyanetRequest,
    );
  }
}
