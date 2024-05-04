import React, { useEffect } from 'react';
import { SettingsTypes } from '@/types/styles/settingsTypes';
import { GenericStyle } from '@/types/styles/styles';

export interface ISettingsEditorItem {
  settingsGroup: SettingsTypes['name'];
  settingsValue: keyof GenericStyle['props'];
  settingsUnit: GenericStyle['props'][keyof GenericStyle['props']]['unit'];
  item: Record<keyof SettingsTypes['props'], SettingsTypes['props']>;
}

const SettingsEditorItem: React.FC<ISettingsEditorItem> = ({ item }) => {
  const name = Object.keys(item)[0] as keyof SettingsTypes['props'];

  useEffect(() => {
    console.log(item);
  }, []);

  return (
    <div className="text-small">
      {name}: {item[name].value}
    </div>
  );
};

export default SettingsEditorItem;
