import { GenericStyle } from '@/types/styles/styles';
import {
  HexUnit,
  NumericMeasurementUnits,
  StringUnit,
} from '@/types/measurements/measurements';

export default interface Border extends GenericStyle {
  name: 'border';
  props: {
    borderTop?: StringUnit<string>;
    borderRight?: StringUnit<string>;
    borderBottom?: StringUnit<string>;
    borderLeft?: StringUnit<string>;
    borderColor?: HexUnit | StringUnit<string>;
    borderRadius?: NumericMeasurementUnits;
    borderWidth?: NumericMeasurementUnits;
  };
}
