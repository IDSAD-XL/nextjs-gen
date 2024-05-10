import { MeasurementUnit } from '@/types/measurements/measurements';

export function getValueWithUnit(object: {
  value: any;
  unit: MeasurementUnit['unit'];
}): string {
  let value;
  if (['px', 'em', 'rem', 'percent', 'vh', 'vw'].includes(object.unit)) {
    return object.value + object.unit;
  }

  if (['string', 'numeric', 'hex'].includes(object.unit)) {
    return object.value;
  }

  if (!value) {
    return '';
  }

  return value;
}
