import React from 'react';
import { SettingsTypes } from '@/types/styles/settingsTypes';
import SettingsEditorItem from '@/components/editor/SettingsEditorItem';

interface ISettingsEditor {
  settings: SettingsTypes[];
}

const SettingsEditor: React.FC<ISettingsEditor> = ({ settings }) => {
  return (
    <div className="flex flex-col gap-[20px] text-white">
      {/*{settings &&
        settings.map((setting, idx) => {
          return (
            <>
              {Object.entries(setting.props).map(([key, value] as Record<keyof SettingsTypes['props'], any>, idx) => {
                const settingValue = setting.props[key];

                return (
                  <SettingsEditorItem
                    key={idx}
                    settingsGroup={setting.name}
                    settingsValue={value}
                    settingsUnit={setting[key].unit}
                    item={{
                      [key]: value,
                    }}
                  />
                );
              })}
            </>
          );
        })}*/}
    </div>
  );
};

export default SettingsEditor;
