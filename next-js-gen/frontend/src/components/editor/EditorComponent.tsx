import React, { useRef } from 'react';
import { Editor } from '@/types/editor';
import getComponent from '@/utils/getComponent';
import useEditorStore from '@/store/useEditorStore';
import { useDrop } from 'react-dnd';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';

export interface IEditor extends Editor {}

const EditorComponent: React.FC<IEditor> = ({ components }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { pushComponent } = useEditorStore();
  const [, drop] = useDrop(
    () => ({
      accept: 'COMPONENT',
      drop: (item: { name: ComponentsTypes['name'] }, monitor) => {
        if (!monitor.didDrop()) {
          pushComponent(item);
        }
      },
    }),
    []
  );

  drop(ref);

  return (
    <div ref={ref} className="flex w-full grow flex-col bg-lilac">
      {components.map((component, index) => {
        return getComponent(component, index);
      })}
    </div>
  );
};

export default EditorComponent;
