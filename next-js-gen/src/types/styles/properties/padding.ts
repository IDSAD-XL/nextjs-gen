import { GenericStyle } from '@/types/styles/styles';
import { NumericMeasurementUnits } from '@/types/measurements/measurements';

export default interface Padding extends GenericStyle {
  name: 'padding';
  props: {
    paddingTop?: NumericMeasurementUnits;
    paddingRight?: NumericMeasurementUnits;
    paddingBottom?: NumericMeasurementUnits;
    paddingLeft?: NumericMeasurementUnits;
  };
}
