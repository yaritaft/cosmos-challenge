import { Injectable } from '@nestjs/common';
import { MegaversesRepository } from '../repositories/megaverses.repository';
import { ValidElement } from '../../core/clients/crossmint/dtos/getGoalMap.dto';
import { CurrentElement } from '../../core/clients/crossmint/dtos/getCurrentMap.dto';

@Injectable()
export class MegaversesService {
  constructor(private readonly cosmosRepository: MegaversesRepository) {}

  async solveMap(candidateId: string): Promise<void> {
    const goalMatrix = await this.cosmosRepository.getGoal({ candidateId });

    for (const [row, value] of Object.entries(goalMatrix.goal)) {
      for (const [column, element] of Object.entries(value)) {
        if ((element as ValidElement) === ValidElement.SPACE) {
          continue;
        }

        await this.cosmosRepository.createElement({
          element: element as ValidElement,
          candidateId,
          row,
          column,
        });
      }
    }
  }

  async eraseMap(candidateId: string): Promise<void> {
    const currentMatrix = await this.cosmosRepository.getCurrentMap({
      candidateId,
    });

    for (const [row, value] of Object.entries(currentMatrix.map.content)) {
      for (const [column, currentElement] of Object.entries(value)) {
        if (currentElement === null) {
          continue;
        }

        await this.cosmosRepository.eraseElement({
          currentElement: currentElement as CurrentElement,
          candidateId,
          row,
          column,
        });
      }
    }
  }
}
