import React from 'react';
import { SettingsTypes } from '@/types/styles/settingsTypes';
import SettingsEditorItem from '@/components/editor/SettingsEditorItem';
import { PropertiesGroup } from '@/types/editor/properties';

interface ISettingsEditor {
  availableSettings: PropertiesGroup<SettingsTypes>[];
}

const SettingsEditor: React.FC<ISettingsEditor> = ({ availableSettings }) => {
  return <div className="flex flex-col gap-[20px] text-white">{}</div>;
};

export default SettingsEditor;
