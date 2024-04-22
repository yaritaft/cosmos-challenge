import { ElementType } from '../../core/clients/crossmint/dtos/elementType.type';
import { CrossmintColor } from '../../core/clients/crossmint/dtos/createSoloon.dto';
import { ValidElement } from 'src/core/clients/crossmint/dtos/getGoalMap.dto';
import { CrossmintDirection } from '../../core/clients/crossmint/dtos/createCometh.dto';

class ElementParams {
  elementType: ElementType;
  color?: CrossmintColor;
  direction?: CrossmintDirection;
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
    color: CrossmintColor.RED,
  },
  BLUE_SOLOON: {
    elementType: ElementType.SOLOON,
    color: CrossmintColor.BLUE,
  },
  PURPLE_SOLOON: {
    elementType: ElementType.SOLOON,
    color: CrossmintColor.PURPLE,
  },
  WHITE_SOLOON: {
    elementType: ElementType.SOLOON,
    color: CrossmintColor.WHITE,
  },
  DOWN_COMETH: {
    elementType: ElementType.COMETH,
    direction: CrossmintDirection.DOWN,
  },
  UP_COMETH: {
    elementType: ElementType.COMETH,
    direction: CrossmintDirection.UP,
  },
  LEFT_COMETH: {
    elementType: ElementType.COMETH,
    direction: CrossmintDirection.LEFT,
  },
  RIGHT_COMETH: {
    elementType: ElementType.COMETH,
    direction: CrossmintDirection.RIGHT,
  },
};

export const CurrentElementMappper: Record<number, ElementParams> = {
  0: {
    elementType: ElementType.POLYANET,
  },
};
