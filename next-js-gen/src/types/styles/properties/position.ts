import { GenericStyle } from '@/types/styles/styles';
import {
  NumericMeasurementUnits,
  NumericUnit,
  StringUnit,
} from '@/types/measurements/measurements';

export interface Position extends GenericStyle {
  name: 'position';
  props: {
    position?: StringUnit<
      'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
    >;
    top?: NumericMeasurementUnits;
    right?: NumericMeasurementUnits;
    bottom?: NumericMeasurementUnits;
    left?: NumericMeasurementUnits;
    zIndex?: NumericUnit;
  };
}
