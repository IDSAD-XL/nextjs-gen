import React, { forwardRef, useEffect, useRef } from 'react';
import { Div } from '@/types/pageComponents/components';
import { parseStyles } from '@/utils/parseStyles';
import useEditorStore from '@/store/useEditorStore';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';

export interface IDivElement extends Div {
  children: React.ReactNode;
  path: string[];
}

const DivElement: React.FC<IDivElement> = ({
  children,
  id,
  name,
  path,
  styles,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { pushComponent } = useEditorStore();
  const [coll, drop] = useDrop({
    accept: 'COMPONENT',
    drop: (item: ComponentsTypes['name'], monitor: DropTargetMonitor) => {
      if (!monitor.didDrop()) {
        pushComponent(item, path);
      }
    },
  });

  drop(ref);

  return (
    <div ref={ref} style={parseStyles(styles)}>
      {children}
    </div>
  );
};

export default DivElement;
