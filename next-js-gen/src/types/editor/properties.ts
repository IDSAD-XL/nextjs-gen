import { SettingsTypes } from '@/types/styles/settingsTypes';
import { GenericStyle } from '@/types/styles/styles';

export interface PropertyItem<T extends SettingsTypes['props']> {
  name: keyof T;
  availableUnits: T[keyof T]['unit'][];
  value: T[keyof T]['value'];
}

export interface PropertiesGroup<T extends SettingsTypes> {
  displayName: string;
  name: T['name'];
  properties: PropertyItem<Required<T['props']>>[];
}
