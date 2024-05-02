import { GenericStyle } from '@/types/styles/styles';
import React from 'react';

export interface BaseComponent {
  id: string;
  name: string;
  styles: GenericStyle[];
  slots?: BaseComponent[];
  children?: React.ReactNode;
}
