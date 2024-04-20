export class GetCurrentMapRequest {
  candidateId: string;
}

type ElementSaved = object | null;

export class GetCurrentMapResponse {
  map: {
    content: ElementSaved[][];
  };
}
