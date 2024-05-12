import { MeasurementUnit } from '@/types/measurements/measurements';

export function getValueWithUnit(object: {
  value: any;
  unit: MeasurementUnit['unit'];
}): string {
  let value;
  if (['px', 'em', 'rem', 'vh', 'vw'].includes(object.unit)) {
    return object.value + object.unit;
  }

  if (object.unit === 'percent') {
    return object.value + '%';
  }

  if (['string', 'numeric', 'hex'].includes(object.unit)) {
    return object.value;
  }

  if (!value) {
    return '';
  }

  return value;
}
