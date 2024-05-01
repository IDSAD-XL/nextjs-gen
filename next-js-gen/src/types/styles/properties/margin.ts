import { GenericStyle } from '@/types/styles/styles';
import { NumericMeasurementUnits } from '@/types/measurements/measurements';

export interface Margin extends GenericStyle {
  name: 'margin';
  props: {
    marginTop?: NumericMeasurementUnits;
    marginRight?: NumericMeasurementUnits;
    marginBottom?: NumericMeasurementUnits;
    marginLeft?: NumericMeasurementUnits;
  };
}
