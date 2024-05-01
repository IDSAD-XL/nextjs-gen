export type PxUnitPattern = `${string}px`;
export type EmUnitPattern = `${string}em`;
export type RemUnitPattern = `${string}rem`;
export type VwUnitPattern = `${string}vw`;
export type VhUnitPattern = `${string}vh`;
export type HexUnitPattern = `#${string}`;
export type PercentUnitPattern = `${string}%`;

export type MeasurementUnitPattern =
  | PxUnitPattern
  | EmUnitPattern
  | RemUnitPattern
  | VwUnitPattern
  | VhUnitPattern
  | HexUnitPattern
  | PercentUnitPattern;

export interface Measurement {
  value: MeasurementUnitPattern | number | string;
}

export interface PxUnit extends Measurement {
  unit: 'px';
  value: PxUnitPattern;
}

export interface EmUnit extends Measurement {
  unit: 'em';
  value: EmUnitPattern;
}

export interface RemUnit extends Measurement {
  unit: 'rem';
  value: RemUnitPattern;
}

export interface VwUnit extends Measurement {
  unit: 'vw';
  value: VwUnitPattern;
}

export interface VhUnit extends Measurement {
  unit: 'vh';
  value: VhUnitPattern;
}

export interface HexUnit extends Measurement {
  unit: 'hex';
  value: HexUnitPattern;
}

export interface PercentUnit extends Measurement {
  unit: 'percent';
  value: PercentUnitPattern;
}

export interface NumericUnit extends Measurement {
  unit: 'numeric';
  value: number;
}

export interface StringUnit<T extends string> extends Measurement {
  unit: 'string';
  value: T;
}

export type MeasurementUnit =
  | PercentUnit
  | StringUnit<string>
  | NumericUnit
  | PxUnit
  | EmUnit
  | RemUnit
  | VwUnit
  | VhUnit
  | HexUnit;

export type NumericMeasurementUnits =
  | PxUnit
  | EmUnit
  | RemUnit
  | VwUnit
  | VhUnit
  | PercentUnit;
