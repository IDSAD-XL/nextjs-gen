import { PropertiesGroup } from '@/types/editor/properties';
import { Border, Margin, Padding } from '@/types/styles/properties';
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
        activeUnit: 'string',
        value: '',
      },
      {
        name: 'borderRight',
        availableUnits: ['string'],
        activeUnit: 'string',
        value: '',
      },
      {
        name: 'borderLeft',
        availableUnits: ['string'],
        activeUnit: 'string',
        value: '',
      },
      {
        name: 'borderTop',
        availableUnits: ['string'],
        activeUnit: 'string',
        value: '',
      },
      {
        name: 'borderColor',
        availableUnits: ['hex', 'string'],
        activeUnit: 'string',
        value: '',
      },
      {
        name: 'borderWidth',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
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
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'height',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'minWidth',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'minHeight',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'maxWidth',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'maxHeight',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
    ],
  } as PropertiesGroup<Size>,
  {
    name: 'padding',
    displayName: 'Padding',
    properties: [
      {
        name: 'paddingTop',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'paddingBottom',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'paddingLeft',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'paddingRight',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
    ],
  } as PropertiesGroup<Padding>,
  {
    name: 'margin',
    displayName: 'Margin',
    properties: [
      {
        name: 'marginTop',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'marginBottom',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'marginLeft',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
      {
        name: 'marginRight',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
      },
    ],
  } as PropertiesGroup<Margin>,
];
