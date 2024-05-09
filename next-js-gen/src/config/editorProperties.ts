import { PropertiesGroup } from '@/types/editor/properties';
import { Border } from '@/types/styles/properties';
import { MeasurementUnit } from '@/types/measurements/measurements';
import Size from '@/types/styles/properties/size';

const NUMERIC_UNITS: MeasurementUnit['unit'][] = [
  'px',
  'em',
  'rem',
  'percent',
  'vh',
  'vw',
];

export const EditorProperties = [
  {
    name: 'border',
    displayName: 'Border',
    properties: [
      {
        name: 'borderBottom',
        availableUnits: ['string'],
        value: '',
      },
      {
        name: 'borderRight',
        availableUnits: ['string'],
        value: '',
      },
      {
        name: 'borderLeft',
        availableUnits: ['string'],
        value: '',
      },
      {
        name: 'borderTop',
        availableUnits: ['string'],
        value: '',
      },
      {
        name: 'borderColor',
        availableUnits: ['hex', 'string'],
        value: '',
      },
      {
        name: 'borderWidth',
        availableUnits: NUMERIC_UNITS,
        value: '',
      },
    ],
  } as PropertiesGroup<Border>,
  {
    name: 'size',
    displayName: 'Size',
    properties: [
      {
        name: 'width',
        availableUnits: NUMERIC_UNITS,
        value: '',
      },
      {
        name: 'height',
        availableUnits: NUMERIC_UNITS,
        value: '',
      },
      {
        name: 'minWidth',
        availableUnits: NUMERIC_UNITS,
        value: '',
      },
      {
        name: 'minHeight',
        availableUnits: NUMERIC_UNITS,
        value: '',
      },
      {
        name: 'maxWidth',
        availableUnits: NUMERIC_UNITS,
        value: '',
      },
      {
        name: 'maxHeight',
        availableUnits: NUMERIC_UNITS,
        value: '',
      },
    ],
  } as PropertiesGroup<Size>,
];
