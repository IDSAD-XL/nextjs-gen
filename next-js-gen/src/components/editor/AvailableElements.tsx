import React from 'react';
import { availableElementsData } from '@/config/availableElementsData';
import AvailableElementsItem from '@/components/editor/AvailableElementsItem';

const AvailableElements = () => {
  return (
    <div className="flex flex-col gap-[20px] px-[20px]">
      {availableElementsData.map((element, index) => (
        <AvailableElementsItem key={index} {...element} />
      ))}
    </div>
  );
};

export default AvailableElements;
