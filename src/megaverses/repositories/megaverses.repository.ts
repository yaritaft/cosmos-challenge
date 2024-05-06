import { Injectable } from '@nestjs/common';
import { ClientApiClient } from '../../core/clients/clientApi/clientApi.client';
import {
  CurrentElement,
  GetCurrentMapRequest,
  GetCurrentMapResponse,
} from '../../core/clients/clientApi/dtos/getCurrentMap.dto';
import {
  GetGoalMapRequest,
  GetGoalMapResponse,
  ValidElement,
} from '../../core/clients/clientApi/dtos/getGoalMap.dto';
import { ElementType } from '../../core/clients/clientApi/dtos/elementType.type';
import {
  CurrentElementMappper,
  ElementMappper,
} from '../mappers/megaverses.mapper';
import { SoloonsStrategy } from './soloon.strategy';
import { BaseElementStrategy } from './base.strategy';
import { ComethsStrategy } from './cometh.strategy';
import { PolyanetsStrategy } from './polyanet.strategy';

interface CreateElementRequest {
  row: string;
  column: string;
  candidateId: string;
  element: ValidElement;
}

interface EraseElementRequest {
  row: string;
  column: string;
  candidateId: string;
  currentElement: CurrentElement;
}

@Injectable()
export class MegaversesRepository {
  constructor(private readonly ClientApiClient: ClientApiClient) {}

  strategyMapper: Record<ElementType, BaseElementStrategy | undefined> = {
    [ElementType.COMETH]: new ComethsStrategy(this.ClientApiClient),
    [ElementType.POLYANET]: new PolyanetsStrategy(this.ClientApiClient),
    [ElementType.SOLOON]: new SoloonsStrategy(this.ClientApiClient),
    [ElementType.SPACE]: undefined,
  };

  createElement(createElementRequest: CreateElementRequest): Promise<void> {
    const { element, ...commonFields } = createElementRequest;
    const { elementType, ...elementParmas } = ElementMappper[element];
    const strategy = this.strategyMapper[elementType];
    if (!strategy) {
      return;
    }
    return strategy.create({ ...elementParmas, ...commonFields });
  }

  eraseElement(eraseElementRequest: EraseElementRequest): Promise<void> {
    const { currentElement, ...commonFields } = eraseElementRequest;
    const { elementType } = CurrentElementMappper[currentElement.type];
    const strategy = this.strategyMapper[elementType];
    return strategy.erase(commonFields);
  }

  getGoal(getGoalMapRequest: GetGoalMapRequest): Promise<GetGoalMapResponse> {
    return this.ClientApiClient.getGoal(getGoalMapRequest);
  }

  getCurrentMap(
    getCurrentMapRequest: GetCurrentMapRequest,
  ): Promise<GetCurrentMapResponse> {
    return this.ClientApiClient.getCurrentMap(getCurrentMapRequest);
  }
}
