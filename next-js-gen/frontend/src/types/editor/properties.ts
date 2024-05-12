import { SettingsTypes } from '@/types/styles/settingsTypes';
import { MeasurementUnit } from '@/types/measurements/measurements';

export interface PropertyItem<T extends SettingsTypes['props']> {
  name: keyof T;
  availableUnits: MeasurementUnit['unit'][];
  activeUnit: MeasurementUnit['unit'];
  value: any;
}

export interface PropertiesGroup<T extends SettingsTypes> {
  displayName: string;
  name: T['name'];
  properties: PropertyItem<Required<T['props']>>[];
}
