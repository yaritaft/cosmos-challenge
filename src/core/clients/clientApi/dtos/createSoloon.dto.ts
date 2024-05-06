import { CreateBaseEleemntRequest } from './baseCreateElement.dto';

export enum ClientApiColor {
  WHITE = 'white',
  RED = 'red',
  PURPLE = 'purple',
  BLUE = 'blue',
}

export class CreateSoloonRequest extends CreateBaseEleemntRequest {
  color: ClientApiColor;
}
