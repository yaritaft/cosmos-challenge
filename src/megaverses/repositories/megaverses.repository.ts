import { Injectable } from '@nestjs/common';
import { CrossmintClient } from '../../core/clients/crossmint/crossmint.client';
import {
  CurrentElement,
  GetCurrentMapRequest,
  GetCurrentMapResponse,
} from '../../core/clients/crossmint/dtos/getCurrentMap.dto';
import {
  GetGoalMapRequest,
  GetGoalMapResponse,
  ValidElement,
} from '../../core/clients/crossmint/dtos/getGoalMap.dto';
import { ElementType } from '../../core/clients/crossmint/dtos/elementType.type';
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
  constructor(private readonly crossmintClient: CrossmintClient) {}

  strategyMapper: Record<ElementType, BaseElementStrategy | undefined> = {
    [ElementType.COMETH]: new ComethsStrategy(this.crossmintClient),
    [ElementType.POLYANET]: new PolyanetsStrategy(this.crossmintClient),
    [ElementType.SOLOON]: new SoloonsStrategy(this.crossmintClient),
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
    const { elementType, ...elementParmas } =
      CurrentElementMappper[currentElement.type];
    const strategy = this.strategyMapper[elementType];
    return strategy.erase({ ...elementParmas, ...commonFields });
  }

  getGoal(getGoalMapRequest: GetGoalMapRequest): Promise<GetGoalMapResponse> {
    return this.crossmintClient.getGoal(getGoalMapRequest);
  }

  getCurrentMap(
    getCurrentMapRequest: GetCurrentMapRequest,
  ): Promise<GetCurrentMapResponse> {
    return this.crossmintClient.getCurrentMap(getCurrentMapRequest);
  }
}
