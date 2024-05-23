import React, { useCallback, useEffect, useMemo } from 'react';
import { SettingsTypes } from '@/types/styles/settingsTypes';
import { PropertiesGroup, PropertyItem } from '@/types/editor/properties';
import SettingsEditorItem from '@/components/editor/SettingsEditorItem';
import { MeasurementUnit } from '@/types/measurements/measurements';
import { getValueFromObject } from '@/utils/getValueFromObject';
import useEditorStore from '@/store/useEditorStore';
import { getValueWithUnit } from '@/utils/getValueWithUnit';
import { AttributesTypes } from '@/types/attributes/attributes';
import AttributeItem from '@/components/editor/AttributeItem';

interface ISettingsEditor {
  availableSettings: PropertiesGroup<SettingsTypes>[];
  componentSettings: SettingsTypes[];
  availableAttributes?: AttributesTypes[];
}

const SettingsEditor: React.FC<ISettingsEditor> = ({
  availableSettings,
  componentSettings,
  availableAttributes,
}) => {
  const { editComponent, editComponentAttributes } = useEditorStore();

  const mappedAvailableSettingsToActual: PropertiesGroup<SettingsTypes>[] =
    useMemo(() => {
      return availableSettings.map((setting) => {
        const actualSetting = componentSettings.find(
          (componentSetting) => componentSetting.name === setting.name
        );

        return {
          ...setting,
          properties: setting.properties.map((property) => {
            const actualProperty = actualSetting?.props[property.name];

            if (actualProperty) {
              const value = getValueFromObject(
                actualSetting?.props[property.name]
              );
              const unit = (
                actualSetting?.props[property.name] as MeasurementUnit
              ).unit;

              return {
                ...property,
                value: value,
                activeUnit: unit,
              };
            } else {
              return property;
            }
          }),
        };
      });
    }, [availableSettings, componentSettings]);

  const changeValueHandler = useCallback(
    (
      groupName: PropertiesGroup<SettingsTypes>['name'],
      name: PropertyItem<SettingsTypes['props']>['name'],
      value: PropertyItem<SettingsTypes['props']>['value'],
      unit: PropertyItem<SettingsTypes['props']>['activeUnit']
    ) => {
      const settingsCopy = [...componentSettings];

      const findGroup = settingsCopy.find(
        (setting) => setting.name === groupName
      );

      const updatedValue = {
        [name]: {
          unit,
          value: getValueWithUnit({ value, unit }),
        },
      };

      if (!findGroup) {
        settingsCopy.push({
          name: groupName,
          props: {
            ...updatedValue,
          },
        });
      } else {
        findGroup.props = {
          ...findGroup.props,
          ...updatedValue,
        };
      }

      editComponent(settingsCopy as SettingsTypes[]);
    },
    [componentSettings]
  );

  const changeAttributeHandler = useCallback(
    (name: AttributesTypes['name'], value: AttributesTypes['value']) => {
      if (!availableAttributes) return;

      const attributesCopy = [...availableAttributes];

      attributesCopy.forEach((attribute) => {
        if (attribute.name === name) {
          attribute.value = value;
        }
      });

      editComponentAttributes(attributesCopy);
    },
    [availableAttributes]
  );

  return (
    <div className="relative flex flex-col gap-[20px] text-white">
      {availableAttributes && (
        <div className="flex flex-col">
          {availableAttributes.map((attribute) => (
            <AttributeItem
              onValueChange={changeAttributeHandler}
              data={attribute}
            />
          ))}
        </div>
      )}
      {mappedAvailableSettingsToActual.map((setting) => {
        return (
          <div key={setting.name}>
            <p className="text-medium">{setting.displayName}</p>
            {setting.properties.map((property) => (
              <SettingsEditorItem
                key={property.name}
                groupName={setting.name}
                onValueChange={changeValueHandler}
                item={property as PropertyItem<SettingsTypes['props']>}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default SettingsEditor;
