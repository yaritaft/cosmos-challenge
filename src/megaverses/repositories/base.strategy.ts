import { CrossmintColor } from '../../core/clients/crossmint/dtos/createSoloon.dto';
import { CrossmintDirection } from '../../core/clients/crossmint/dtos/createCometh.dto';

export interface CreateElement {
  row: string;
  column: string;
  candidateId: string;
  color?: CrossmintColor;
  direction?: CrossmintDirection;
}

export interface EraseElement {
  row: string;
  column: string;
  candidateId: string;
}

export abstract class BaseElementStrategy {
  abstract create(createSoloonRequest: CreateElement): Promise<void>;
  abstract erase(eraseElement: EraseElement): Promise<void>;
}
