import React, { forwardRef, ReactEventHandler, useEffect, useRef } from 'react';
import { Div } from '@/types/pageComponents/components';
import { parseStyles } from '@/utils/parseStyles';
import useEditorStore from '@/store/useEditorStore';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';

export interface IDivElement {
  component: Div;
  children: React.ReactNode;
  path: string[];
}

const DivElement: React.FC<IDivElement> = ({ children, component, path }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { pushComponent, editComponent, setActiveEditorComponent } =
    useEditorStore();
  const [coll, drop] = useDrop({
    accept: 'COMPONENT',
    drop: (item: ComponentsTypes['name'], monitor: DropTargetMonitor) => {
      if (!monitor.didDrop()) {
        pushComponent(item, path);
      }
    },
  });

  const setActiveEditorComponentHandler = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setActiveEditorComponent(component, path);
  };

  drop(ref);

  return (
    <div
      ref={ref}
      onClick={setActiveEditorComponentHandler}
      style={parseStyles(component.styles)}
    >
      {children}
    </div>
  );
};

export default DivElement;
