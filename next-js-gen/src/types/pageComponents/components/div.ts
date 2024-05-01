import { BaseComponent } from '@/types/pageComponents/baseComponent';
import { SizeProps } from '@/types/styles/properties/size';
import { Position } from '@/types/styles/properties/position';
import { Margin } from '@/types/styles/properties/margin';
import { Padding } from '@/types/styles/properties/padding';
import { Colors } from '@/types/styles/properties/colors';
import { Border } from '@/types/styles/properties/border';

export interface Div extends BaseComponent {
  name: 'div';
  styles: Array<SizeProps | Position | Margin | Padding | Colors | Border>;
}
