import { GenericStyle } from '@/types/styles/styles';
import { HexUnit, StringUnit } from '@/types/measurements/measurements';

export interface Colors extends GenericStyle {
  name: 'colors';
  props: {
    color?: HexUnit | StringUnit<string>;
    backgroundColor?: HexUnit | StringUnit<string>;
  };
}
