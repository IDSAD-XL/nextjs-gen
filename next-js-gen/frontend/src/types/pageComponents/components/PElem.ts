import { BaseComponent } from '@/types/pageComponents/baseComponent';
import {
  Border,
  Colors,
  Margin,
  Padding,
  Position,
  SizeProps,
} from '@/types/styles/properties';

export default interface PElem extends BaseComponent {
  name: 'p';
  styles: Array<SizeProps | Position | Margin | Padding | Colors | Border>;
}
