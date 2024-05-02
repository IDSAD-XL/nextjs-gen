import React, {
  ComponentType,
  FC,
  ForwardedRef,
  useEffect,
  useRef,
} from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import useEditorStore from '@/store/useEditorStore';

interface WithDropTargetProps {
  id: string;
  props: {};
}

export const ElementWithDropTarget = <P extends WithDropTargetProps>(
  Component: FC<P>,
  props: P,
  path: string[]
) => {
  const ref = useRef<HTMLDivElement>(null);

  const { pushComponent } = useEditorStore();
  const [coll, drop] = useDrop({
    accept: 'COMPONENT',
    drop: (item: any, monitor: DropTargetMonitor) => {
      console.log('2');
      if (!monitor.didDrop()) {
        pushComponent(item.name, path);
      }
    },
  });

  drop(ref);

  useEffect(() => {
    console.log(coll);
  }, [coll]);

  return <Component ref={ref} {...props} />;
};
