import { MeasurementUnit } from '@/types/measurements/measurements';

export type StyleValue = {
  [key: string]: MeasurementUnit;
};

export interface GenericStyle {
  name: string;
  props: StyleValue;
}
