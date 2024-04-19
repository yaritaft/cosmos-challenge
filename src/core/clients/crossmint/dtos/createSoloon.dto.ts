import { CreateBaseEleemntRequest } from './baseCreateElement.dto';

export enum CrossmintColor {
  WHITE = 'white',
  RED = 'red',
  PURPLE = 'purple',
  BLUE = 'blue',
}

export class CreateSoloonRequest extends CreateBaseEleemntRequest {
  color: CrossmintColor;
}
