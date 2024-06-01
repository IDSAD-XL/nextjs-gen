import { PropertiesGroup } from '@/types/editor/properties';
import {
  Border,
  Colors,
  Margin,
  Padding,
  Position,
} from '@/types/styles/properties';
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
    name: 'colors',
    displayName: 'Colors',
    properties: [
      {
        name: 'backgroundColor',
        availableUnits: ['hex', 'string'],
        activeUnit: 'string',
        value: '',
        inputType: 'default',
      },
      {
        name: 'color',
        availableUnits: ['hex', 'string'],
        activeUnit: 'string',
        value: '',
        inputType: 'default',
      },
    ],
  } as PropertiesGroup<Colors>,
  {
    name: 'position',
    displayName: 'Position',
    properties: [
      {
        name: 'position',
        availableUnits: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
        activeUnit: 'relative',
        value: '',
        inputType: 'select',
      },
      {
        name: 'top',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'bottom',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'left',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'right',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
    ],
  } as PropertiesGroup<Position>,
  {
    name: 'border',
    displayName: 'Border',
    properties: [
      {
        name: 'borderBottom',
        availableUnits: ['string'],
        activeUnit: 'string',
        value: '',
        inputType: 'default',
      },
      {
        name: 'borderRight',
        availableUnits: ['string'],
        activeUnit: 'string',
        value: '',
        inputType: 'default',
      },
      {
        name: 'borderLeft',
        availableUnits: ['string'],
        activeUnit: 'string',
        value: '',
        inputType: 'default',
      },
      {
        name: 'borderTop',
        availableUnits: ['string'],
        activeUnit: 'string',
        value: '',
        inputType: 'default',
      },
      {
        name: 'borderColor',
        availableUnits: ['hex', 'string'],
        activeUnit: 'string',
        value: '',
        inputType: 'default',
      },
      {
        name: 'borderWidth',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
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
        inputType: 'default',
      },
      {
        name: 'height',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'minWidth',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'minHeight',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'maxWidth',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'maxHeight',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
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
        inputType: 'default',
      },
      {
        name: 'paddingBottom',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'paddingLeft',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'paddingRight',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
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
        inputType: 'default',
      },
      {
        name: 'marginBottom',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'marginLeft',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
      {
        name: 'marginRight',
        availableUnits: NUMERIC_UNITS,
        activeUnit: 'px',
        value: '',
        inputType: 'default',
      },
    ],
  } as PropertiesGroup<Margin>,
];
