import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';

export interface IAvailableElements {
  name: ComponentsTypes['name'];
  displayName: string;
  description?: string;
}

export const availableElementsData: IAvailableElements[] = [
  {
    name: 'div',
    displayName: 'Div',
    description: 'A generic container element',
  },
];
