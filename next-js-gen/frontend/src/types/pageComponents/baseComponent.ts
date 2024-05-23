import { GenericStyle } from '@/types/styles/styles';
import React from 'react';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import { AttributesTypes } from '@/types/attributes/attributes';

export interface BaseComponent {
  id: string;
  name: string;
  styles: GenericStyle[];
  attributes?: AttributesTypes[];
  slots?: ComponentsTypes[];
  children?: React.ReactNode;
}
