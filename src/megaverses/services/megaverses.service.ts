import { Injectable } from '@nestjs/common';
import { MegaversesRepository } from '../repositories/megaverses.repository';
import { ElementMappper } from '../mappers/megaverses.mapper';
import { ElementType } from '../../core/clients/crossmint/dtos/elementType.type';
import { CrossmintColor } from '../../core/clients/crossmint/dtos/createSoloon.dto';
import { CrossmintDirection } from '../../core/clients/crossmint/dtos/createCometh.dto';

interface CreateMethod {
  row: string;
  column: string;
  candidateId: string;
  color?: CrossmintColor;
  direction?: CrossmintDirection;
}

@Injectable()
export class MegaversesService {
  constructor(private readonly cosmosRepository: MegaversesRepository) {}

  createMethodMap: Record<
    ElementType,
    (createMethod: CreateMethod) => Promise<void> | undefined
  > = {
    [ElementType.COMETH]: this.cosmosRepository.createCometh,
    [ElementType.POLYANET]: this.cosmosRepository.createPolyanet,
    [ElementType.SOLOON]: this.cosmosRepository.createSoloon,
    [ElementType.SPACE]: undefined,
  };

  eraseMethodMap: Record<ElementType, ({}) => Promise<void> | undefined> = {
    [ElementType.COMETH]: this.cosmosRepository.createCometh,
    [ElementType.POLYANET]: this.cosmosRepository.createPolyanet,
    [ElementType.SOLOON]: this.cosmosRepository.createSoloon,
    [ElementType.SPACE]: undefined,
  };

  methodMapper(elementType: ElementType) {
    return this.createMethodMap[elementType];
  }

  async solveMap(candidateId: string): Promise<void> {
    const goalMatrix = await this.cosmosRepository.getGoal({ candidateId });

    for (const [row, value] of Object.entries(goalMatrix.goal)) {
      for (const [column, value2] of Object.entries(value)) {
        if (value2 === ElementType.SPACE) {
          continue;
        }

        const { elementType, color, direction } = ElementMappper[value2];
        const createMethod: (createMethod: CreateMethod) => Promise<void> =
          this.createMethodMap[elementType];
        await createMethod({ color, direction, candidateId, row, column });
      }
    }
  }

  async wipeMap(candidateId: string): Promise<void> {
    // TODO: FINISH THIS Once we have access to the api again
    const currentMap = await this.cosmosRepository.getCurrentMap({
      candidateId,
    });

    for (const [row, value] of Object.entries(currentMap.map.content)) {
      for (const [column, value2] of Object.entries(value)) {
        if (value2 !== null) {
          const { elementType } = ElementMappper[value2 as any]; // IT IS NOT POSSIBLE TO CHECK THIS WITHOUT ACCESS
          // ANYWAY ANY PLANET IS ERASABLE BY THE SAME ENDPOINT
          const eraseMethod = this.eraseMethodMap[elementType];
          eraseMethod({ candidateId, row, column });
        }
      }
    }
  }
}
