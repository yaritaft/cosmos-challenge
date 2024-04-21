import { Injectable } from '@nestjs/common';
import { CrossmintClient } from '../../core/clients/crossmint/crossmint.client';
import { EraseSoloonRequest } from '../../core/clients/crossmint/dtos/eraseSoloon.dto';
import { EraseComethRequest } from '../../core/clients/crossmint/dtos/eraseCometh.dto';
import { ErasePolyanetRequest } from '../../core/clients/crossmint/dtos/erasePolyanet.dto';
import {
  CreateSoloonRequest,
  CrossmintColor,
} from '../../core/clients/crossmint/dtos/createSoloon.dto';
import {
  CreateComethRequest,
  CrossmintDirection,
} from '../../core/clients/crossmint/dtos/createCometh.dto';
import {
  GetCurrentMapRequest,
  GetCurrentMapResponse,
} from '../../core/clients/crossmint/dtos/getCurrentMap.dto';
import {
  GetGoalMapRequest,
  GetGoalMapResponse,
  ValidElement,
} from '../../core/clients/crossmint/dtos/getGoalMap.dto';
import { CreatePolyanetRequest } from '../../core/clients/crossmint/dtos/createPolyanet.dto';
import { ElementType } from '../../core/clients/crossmint/dtos/elementType.type';
import { ElementMappper } from '../mappers/megaverses.mapper';

interface CreateMethod {
  row: string;
  column: string;
  candidateId: string;
  color?: CrossmintColor;
  direction?: CrossmintDirection;
}

interface CreateElement {
  row: string;
  column: string;
  candidateId: string;
  element: ValidElement;
}

@Injectable()
export class MegaversesRepository {
  constructor(private readonly crossmintClient: CrossmintClient) {}

  createMethodMap: Record<
    ElementType,
    (createMethod: CreateMethod) => Promise<void> | undefined
  > = {
    [ElementType.COMETH]: this.createCometh,
    [ElementType.POLYANET]: this.createPolyanet,
    [ElementType.SOLOON]: this.createSoloon,
    [ElementType.SPACE]: undefined,
  };

  eraseMethodMap: Record<ElementType, ({}) => Promise<void> | undefined> = {
    [ElementType.COMETH]: this.createCometh,
    [ElementType.POLYANET]: this.createPolyanet,
    [ElementType.SOLOON]: this.createSoloon,
    [ElementType.SPACE]: undefined,
  };

  createElement({
    element,
    candidateId,
    row,
    column,
  }: CreateElement): Promise<void> {
    const { elementType, color, direction } = ElementMappper[element];
    const createMethod: (createMethod: CreateMethod) => Promise<void> =
      this.createMethodMap[elementType];
    return createMethod({ color, direction, candidateId, row, column });
  }

  createPolyanet(createPolyanetRequest: CreatePolyanetRequest): Promise<void> {
    return this.crossmintClient.createPolyanet(createPolyanetRequest);
  }

  getGoal(getGoalMapRequest: GetGoalMapRequest): Promise<GetGoalMapResponse> {
    return this.crossmintClient.getGoal(getGoalMapRequest);
  }

  createCometh(createComethRequest: CreateComethRequest): Promise<void> {
    return this.crossmintClient.createCometh(createComethRequest);
  }

  createSoloon(createSoloonRequest: CreateSoloonRequest): Promise<void> {
    return this.crossmintClient.createSoloon(createSoloonRequest);
  }

  erasePolyanets(erasePolyanetRequest: ErasePolyanetRequest): Promise<void> {
    return this.crossmintClient.erasePolyanets(erasePolyanetRequest);
  }

  eraseCometh(eraseComethRequest: EraseComethRequest): Promise<void> {
    return this.crossmintClient.eraseCometh(eraseComethRequest);
  }

  eraseSoloon(eraseSoloonRequest: EraseSoloonRequest): Promise<void> {
    return this.crossmintClient.eraseSoloon(eraseSoloonRequest);
  }

  getCurrentMap(
    getCurrentMapRequest: GetCurrentMapRequest,
  ): Promise<GetCurrentMapResponse> {
    return this.crossmintClient.getCurrentMap(getCurrentMapRequest);
  }
}
