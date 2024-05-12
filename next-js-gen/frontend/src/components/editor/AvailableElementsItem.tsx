import React, { useEffect } from 'react';
import { IAvailableElements } from '@/config/availableElementsData';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useRef } from 'react';

const AvailableElementsItem: React.FC<IAvailableElements> = ({
  name,
  displayName,
  description,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [collected, drag] = useDrag({
    type: 'COMPONENT',
    item: { name, type: 'COMPONENT' },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className="flex cursor-pointer flex-col gap-[12px] overflow-hidden rounded-[12px] bg-gray-medium p-[8px] text-white"
    >
      <span className="text-[20px] font-bold">{displayName}</span>
      <span className="text-gray-light text-[14px]">{description}</span>
    </div>
  );
};

export default AvailableElementsItem;
