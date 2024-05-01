import { GenericStyle } from '@/types/styles/styles';
import { NumericMeasurementUnits } from '@/types/measurements/measurements';

export interface SizeProps extends GenericStyle {
  name: 'size';
  props: {
    width?: NumericMeasurementUnits;
    height?: NumericMeasurementUnits;
    maxWidth?: NumericMeasurementUnits;
    maxHeight?: NumericMeasurementUnits;
  };
}
