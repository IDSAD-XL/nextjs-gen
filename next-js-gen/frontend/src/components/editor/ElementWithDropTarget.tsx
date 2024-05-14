import React, { FC, useEffect, useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import useEditorStore from '@/store/useEditorStore';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import { IDivElement } from '@/components/elements/DivElement';

export interface IElementWithDropTarget {
  componentData: ComponentsTypes;
  Component: FC<IDivElement>;
  path: string[];
  children?: React.ReactNode;
}

export const ElementWithDropTarget: React.FC<IElementWithDropTarget> = (
  props
) => {
  const ref = useRef<HTMLDivElement>(null);

  const { pushComponent, setActiveEditorComponent } = useEditorStore();
  const [coll, drop] = useDrop({
    accept: 'COMPONENT',
    drop: (item: ComponentsTypes['name'], monitor: DropTargetMonitor) => {
      if (!monitor.didDrop()) {
        pushComponent(item, props.path);
      }
    },
  });

  const setActiveEditorComponentHandler = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveEditorComponent(props.componentData, props.path);
  };

  useEffect(() => {
    drop(ref);
    if (ref.current) {
      ref.current.addEventListener('click', setActiveEditorComponentHandler);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener(
          'click',
          setActiveEditorComponentHandler
        );
      }
    };
  });

  const ComponentWithDropTarget = (props: any) => {
    return (
      <props.Component ref={ref} {...props}>
        {props.children}
      </props.Component>
    );
  };

  return <ComponentWithDropTarget {...props} />;
};
