import React, { useMemo } from 'react';
import { availableElementsData } from '@/config/availableElementsData';
import AvailableElementsItem from '@/components/editor/AvailableElementsItem';
import useEditorStore from '@/store/useEditorStore';
import { Button } from 'baseui/button';
import { Filter } from 'baseui/icon';

const AvailableElements = () => {
  const { setTreeViewOpen } = useEditorStore();

  return (
    <div className="flex flex-col gap-[20px] px-[20px]">
      <Button
        size={'mini'}
        kind={'secondary'}
        onClick={() => {
          setTreeViewOpen(true);
        }}
        startEnhancer={() => <Filter size={20} />}
      >
        Open tree view
      </Button>
      {availableElementsData.map((element, index) => (
        <AvailableElementsItem key={index} {...element} />
      ))}
    </div>
  );
};

export default AvailableElements;
