import { SettingsTypes } from '@/types/styles/settingsTypes';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';

export type MapComponentsToAvailablePropsGroups = {
  [key in ComponentsTypes['name']]: SettingsTypes['name'][];
};
