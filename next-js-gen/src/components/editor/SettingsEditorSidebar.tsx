import React, { useEffect, useMemo } from 'react';
import useEditorStore from '@/store/useEditorStore';
import findComponentByIdPath from '@/utils/findComponentByIdPath';
import SettingsEditor from '@/components/editor/SettingsEditor';
import { MappedComponentsToPropsGroups } from '@/config/mappedComponentsToPropsGroups';
import { EditorProperties } from '@/config/editorProperties';
import { PropertiesGroup } from '@/types/editor/properties';
import { SettingsTypes } from '@/types/styles/settingsTypes';

const SettingsEditorSidebar = () => {
  const { editorData, activeEditorComponent } = useEditorStore();

  const activeComponent = useMemo(() => {
    if (!activeEditorComponent?.component) return null;
    if (!activeEditorComponent.parentElementsPathIds) return null;

    return findComponentByIdPath(
      editorData.components,
      activeEditorComponent.parentElementsPathIds
    );
  }, [activeEditorComponent]);

  const availableSettings = useMemo(() => {
    if (!activeComponent) return [];

    const settingsGroups = MappedComponentsToPropsGroups[activeComponent.name];

    return EditorProperties.filter((setting) => {
      return settingsGroups.includes(setting.name);
    }) as PropertiesGroup<SettingsTypes>[];
  }, [activeComponent]);

  useEffect(() => {
    console.log(availableSettings);
  }, [availableSettings]);

  return (
    <div className="fixed right-0 top-0 h-screen w-[300px] bg-gray-dark px-[12px] pt-[80px]">
      {activeComponent && (
        <>
          <p className="my-[6px] text-medium text-white">
            {activeComponent?.id}
          </p>
          <SettingsEditor
            availableSettings={availableSettings}
            componentSettings={activeComponent.styles}
          />
        </>
      )}
    </div>
  );
};

export default SettingsEditorSidebar;
