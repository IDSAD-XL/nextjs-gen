import React, { useEffect, useMemo } from 'react';
import useEditorStore from '@/store/useEditorStore';
import findComponentByIdPath from '@/utils/findComponentByIdPath';
import SettingsEditor from '@/components/editor/SettingsEditor';

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

  useEffect(() => {
    console.log(activeComponent);
  }, [activeComponent]);

  return (
    <div className="fixed right-0 top-0 h-screen w-[300px] bg-gray-dark px-[12px] pt-[80px]">
      {activeComponent && (
        <>
          <p className="my-[6px] text-medium text-white">
            {activeComponent?.id}
          </p>
          <SettingsEditor settings={activeComponent?.styles} />
        </>
      )}
    </div>
  );
};

export default SettingsEditorSidebar;
