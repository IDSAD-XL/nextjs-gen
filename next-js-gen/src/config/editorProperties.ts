import { PropertiesGroup, PropertyItem } from '@/types/editor/properties';
import { GenericStyle } from '@/types/styles/styles';
import { Border } from '@/types/styles/properties';
import { NumericMeasurementUnits } from '@/types/measurements/measurements';

export const EditorProperties = [
  {
    name: 'border',
    displayName: 'Border',
    properties: [
      {
        name: 'borderBottom',
        availableUnits: ['px', 'em', 'rem', '%'],
      },
    ],
  } as PropertiesGroup<Border>,
];
