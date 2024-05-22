import { MeasurementUnit } from '@/types/measurements/measurements';

export function getValueFromObject(object: MeasurementUnit): string {
  console.log(object);
  let value;

  if (['px', 'em', 'rem', 'percent', 'vh', 'vw'].includes(object.unit)) {
    //parse all numbers
    const regex = /(\d+)/g;
    value = object.value.toString().match(regex)?.join('');
  } else if (['string'].includes(object.unit)) {
    value = object.value.toString();
  }

  if (!value) {
    return '';
  }

  return value;
}
