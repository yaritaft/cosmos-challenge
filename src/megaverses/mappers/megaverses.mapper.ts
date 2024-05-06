import { ElementType } from '../../core/clients/clientApi/dtos/elementType.type';
import { ClientApiColor } from '../../core/clients/clientApi/dtos/createSoloon.dto';
import { ValidElement } from 'src/core/clients/clientApi/dtos/getGoalMap.dto';
import { ClientApiDirection } from '../../core/clients/clientApi/dtos/createCometh.dto';

class ElementParams {
  elementType: ElementType;
  color?: ClientApiColor;
  direction?: ClientApiDirection;
}

export const ElementMappper: Record<ValidElement, ElementParams> = {
  SPACE: {
    elementType: ElementType.SPACE,
  },
  POLYANET: {
    elementType: ElementType.POLYANET,
  },
  RED_SOLOON: {
    elementType: ElementType.SOLOON,
    color: ClientApiColor.RED,
  },
  BLUE_SOLOON: {
    elementType: ElementType.SOLOON,
    color: ClientApiColor.BLUE,
  },
  PURPLE_SOLOON: {
    elementType: ElementType.SOLOON,
    color: ClientApiColor.PURPLE,
  },
  WHITE_SOLOON: {
    elementType: ElementType.SOLOON,
    color: ClientApiColor.WHITE,
  },
  DOWN_COMETH: {
    elementType: ElementType.COMETH,
    direction: ClientApiDirection.DOWN,
  },
  UP_COMETH: {
    elementType: ElementType.COMETH,
    direction: ClientApiDirection.UP,
  },
  LEFT_COMETH: {
    elementType: ElementType.COMETH,
    direction: ClientApiDirection.LEFT,
  },
  RIGHT_COMETH: {
    elementType: ElementType.COMETH,
    direction: ClientApiDirection.RIGHT,
  },
};

export const CurrentElementMappper: Record<number, ElementParams> = {
  0: {
    elementType: ElementType.POLYANET,
  },
  1: {
    elementType: ElementType.SOLOON,
  },
  2: {
    elementType: ElementType.COMETH,
  },
};
