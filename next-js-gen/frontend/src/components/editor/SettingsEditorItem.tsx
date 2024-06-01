import React, { useCallback, useEffect, useState } from 'react';
import { SettingsTypes } from '@/types/styles/settingsTypes';
import { PropertiesGroup, PropertyItem } from '@/types/editor/properties';
import { MeasurementUnit } from '@/types/measurements/measurements';
import { useDebounceCallback } from 'usehooks-ts';
import { getValueFromObject } from '@/utils/getValueFromObject';
import { Input } from 'baseui/input';
import { Select, Value } from 'baseui/select';

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

interface IUnitBaseUIItem {
  id: MeasurementUnit['unit'];
  label: MeasurementUnit['unit'];
}

const SettingsEditorItem: React.FC<ISettingsEditorItem> = ({
  item,
  groupName,
  onValueChange,
}) => {
  const [activeUnit, setActiveUnit] = useState<IUnitBaseUIItem[]>([
    { label: item.activeUnit, id: item.activeUnit },
  ]);
  const [value, setValue] = useState(item.value);

  const debouncedValueCb = useDebounceCallback(onValueChange, 200);

  const valueChangeHandler = useCallback(
    (value: any) => {
      const parsedValue = getValueFromObject({
        value: value,
        unit: activeUnit[0].id,
      });
      setValue(parsedValue);
      debouncedValueCb(groupName, item.name, parsedValue, activeUnit[0].id);
    },
    [groupName, item.name, activeUnit, debouncedValueCb]
  );

  const unitChangeHandler = useCallback(
    (unit: any) => {
      console.log(unit);
      setActiveUnit(unit);
      debouncedValueCb(groupName, item.name, value, unit[0].id);
    },
    [groupName, item.name, activeUnit, debouncedValueCb]
  );

  useEffect(() => {
    setValue(item.value);
    setActiveUnit([{ label: item.activeUnit, id: item.activeUnit }]);
  }, [item.value, item.activeUnit]);

  return (
    <div className="mb-[10px] flex flex-col text-small">
      <p className="mr-[10px]">{item.name}</p>
      <div className="mt-[5px] flex gap-[5px]">
        {item.inputType === 'select' && (
          <Select
            value={activeUnit}
            size={'mini'}
            clearable={false}
            searchable={false}
            options={item.availableUnits.map((unit) => ({
              id: unit,
              label: unit,
            }))}
            onChange={(params) => {
              unitChangeHandler(params.value);
              valueChangeHandler(params.value?.id);
            }}
          />
        )}
        {item.inputType === 'default' && (
          <>
            <Input
              size={'mini'}
              type="text"
              value={value}
              onChange={(e) => valueChangeHandler(e.target.value)}
            />
            <Select
              value={activeUnit}
              size={'mini'}
              clearable={false}
              searchable={false}
              options={item.availableUnits.map((unit) => ({
                id: unit,
                label: unit,
              }))}
              onChange={(params) => unitChangeHandler(params.value)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsEditorItem;
