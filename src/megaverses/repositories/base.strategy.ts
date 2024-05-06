import { ClientApiColor } from '../../core/clients/clientApi/dtos/createSoloon.dto';
import { ClientApiDirection } from '../../core/clients/clientApi/dtos/createCometh.dto';

export interface CreateElement {
  row: string;
  column: string;
  candidateId: string;
  color?: ClientApiColor;
  direction?: ClientApiDirection;
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
