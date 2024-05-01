import { MeasurementUnit } from '@/types/measurements/measurements';

type StyleValue = {
  [key in keyof CSSStyleDeclaration]?: MeasurementUnit;
};

export interface GenericStyle {
  name: string;
  props: StyleValue;
}
