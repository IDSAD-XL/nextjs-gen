import { BaseComponent } from '@/types/pageComponents/baseComponent';
import {
  Border,
  Colors,
  Margin,
  Padding,
  Position,
  SizeProps,
} from '@/types/styles/properties';

export default interface SpanElem extends BaseComponent {
  name: 'span';
  styles: Array<SizeProps | Position | Margin | Padding | Colors | Border>;
}
