import { GenericStyle } from '@/types/styles/styles';
import React from 'react';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';

export interface BaseComponent {
  id: string;
  name: string;
  styles: GenericStyle[];
  slots?: ComponentsTypes[];
  children?: React.ReactNode;
}
