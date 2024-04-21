import { ValidElement } from './getGoalMap.dto';

export class GetCurrentMapRequest {
  candidateId: string;
}

type ElementSaved = ValidElement | null;

export class GetCurrentMapResponse {
  map: {
    content: ElementSaved[][];
  };
}
