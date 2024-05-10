import React, { useEffect, useState } from 'react';
import { SettingsTypes } from '@/types/styles/settingsTypes';
import { PropertiesGroup, PropertyItem } from '@/types/editor/properties';
import { MeasurementUnit } from '@/types/measurements/measurements';
import { useDebounceCallback } from 'usehooks-ts';

export interface ISettingsEditorItem {
  onValueChange: (
    groupName: PropertiesGroup<SettingsTypes>['name'],
    name: PropertyItem<SettingsTypes['props']>['name'],
    value: PropertyItem<SettingsTypes['props']>['value'],
    unit: PropertyItem<SettingsTypes['props']>['activeUnit']
  ) => void;
  groupName: PropertiesGroup<SettingsTypes>['name'];
  item: PropertyItem<SettingsTypes['props']>;
}

const SettingsEditorItem: React.FC<ISettingsEditorItem> = ({
  item,
  groupName,
  onValueChange,
}) => {
  const [activeUnit, setActiveUnit] = useState(item.activeUnit);
  const [value, setValue] = useState(item.value);

  const debouncedValueCb = useDebounceCallback(onValueChange, 500);

  const valueChangeHandler = (value: any) => {
    debouncedValueCb(groupName, item.name, value, activeUnit);
    setValue(value);
  };

  return (
    <div className="mb-[10px] flex flex-col text-small">
      <p className="mr-[10px]">{item.name}</p>
      <div className="mt-[5px] flex">
        <input
          className="focus:bg-gray-light w-[150px] border-b-[1px] border-white bg-gray-dark text-white focus:outline-none"
          type="text"
          value={value}
          onChange={(e) => valueChangeHandler(e.target.value)}
        />
        <select
          value={activeUnit}
          className="ml-[10px] bg-gray-dark text-white"
          name={item.name}
          onChange={(e) =>
            setActiveUnit(e.target.value as MeasurementUnit['unit'])
          }
        >
          {item.availableUnits.map((unit, idx) => (
            <option key={idx} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SettingsEditorItem;
