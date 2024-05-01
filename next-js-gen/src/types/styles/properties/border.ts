import { GenericStyle } from '@/types/styles/styles';
import {
  HexUnit,
  NumericMeasurementUnits,
  StringUnit,
} from '@/types/measurements/measurements';

export interface Border extends GenericStyle {
  name: 'border';
  props: {
    borderTop?: NumericMeasurementUnits;
    borderRight?: NumericMeasurementUnits;
    borderBottom?: NumericMeasurementUnits;
    borderLeft?: NumericMeasurementUnits;
    borderColor?: HexUnit | StringUnit<string>;
    borderRadius?: NumericMeasurementUnits;
    borderWidth?: NumericMeasurementUnits;
  };
}
