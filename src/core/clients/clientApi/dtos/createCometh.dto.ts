import { CreateBaseEleemntRequest } from './baseCreateElement.dto';

export enum ClientApiDirection {
  UP = 'up',
  DOWN = 'down',
  RIGHT = 'right',
  LEFT = 'left',
}

export class CreateComethRequest extends CreateBaseEleemntRequest {
  direction: ClientApiDirection;
}
