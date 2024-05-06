export class GetGoalMapRequest {
  candidateId: string;
}

export enum ValidElement {
  'POLYANET' = 'POLYANET',
  'RED_SOLOON' = 'RED_SOLOON',
  'BLUE_SOLOON' = 'BLUE_SOLOON',
  'PURPLE_SOLOON' = 'PURPLE_SOLOON',
  'WHITE_SOLOON' = 'WHITE_SOLOON',
  'DOWN_COMETH' = 'DOWN_COMETH',
  'UP_COMETH' = 'UP_COMETH',
  'LEFT_COMETH' = 'LEFT_COMETH',
  'RIGHT_COMETH' = 'RIGHT_COMETH',
  'SPACE' = 'SPACE',
}

export class GetGoalMapResponse {
  goal: string[][];
}
