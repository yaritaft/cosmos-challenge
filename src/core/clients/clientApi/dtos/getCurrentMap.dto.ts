export class GetCurrentMapRequest {
  candidateId: string;
}

export interface CurrentElement {
  type: number;
}

type ElementSaved = CurrentElement | null;

export class GetCurrentMapResponse {
  map: {
    content: ElementSaved[][];
  };
}
