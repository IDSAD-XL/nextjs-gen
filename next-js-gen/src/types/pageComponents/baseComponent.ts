import { GenericStyle } from '@/types/styles/styles';

export interface BaseComponent {
  id: string;
  name: string;
  styles: GenericStyle[];
}
