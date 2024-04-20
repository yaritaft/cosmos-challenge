export class GetGoalMapRequest {
  candidateId: string;
}

export type ValidElement =
  | 'POLYANET'
  | 'RED_SOLOON'
  | 'BLUE_SOLOON'
  | 'PURPLE_SOLOON'
  | 'WHITE_SOLOON'
  | 'DOWN_COMETH'
  | 'UP_COMETH'
  | 'LEFT_COMETH'
  | 'RIGHT_COMETH'
  | 'SPACE';

export class GetGoalMapResponse {
  goal: string[][];
}
