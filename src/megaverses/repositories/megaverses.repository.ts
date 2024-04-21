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

  eraseMethodMap: Record<ElementType, ({}) => Promise<void> | undefined> = {
    [ElementType.COMETH]: this.createCometh,
    [ElementType.POLYANET]: this.createPolyanet,
    [ElementType.SOLOON]: this.createSoloon,
    [ElementType.SPACE]: undefined,
  };

  async createElement({
    element,
    candidateId,
    row,
    column,
  }: CreateElement): Promise<void> {
    const { elementType, color, direction } = ElementMappper[element];
    switch (elementType) {
      case ElementType.POLYANET:
        this.createPolyanet({
          candidateId,
          row,
          column,
        });
        break;
      case ElementType.COMETH:
        await this.createCometh({
          direction,
          candidateId,
          row,
          column,
        });
        break;
      case ElementType.SOLOON:
        await this.createSoloon({
          color,
          candidateId,
          row,
          column,
        });
        break;
      case ElementType.SPACE:
        break;
    }
    // TODO: EXPLAIN THAT DOING THIS WITH AD ICT IS NOT POSSIBLE DUE TO TESTING PURPOSES
  }

  createPolyanet(createPolyanetRequest: CreateMethod): Promise<void> {
    return this.crossmintClient.createPolyanet(createPolyanetRequest);
  }

  getGoal(getGoalMapRequest: GetGoalMapRequest): Promise<GetGoalMapResponse> {
    return this.crossmintClient.getGoal(getGoalMapRequest);
  }

  createCometh(createComethRequest: CreateMethod): Promise<void> {
    return this.crossmintClient.createCometh(
      createComethRequest as CreateComethRequest,
    );
  }

  createSoloon(createSoloonRequest: CreateMethod): Promise<void> {
    return this.crossmintClient.createSoloon(
      createSoloonRequest as CreateSoloonRequest,
    );
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
