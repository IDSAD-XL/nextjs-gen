'use client';
import React from 'react';
import AvailableElements from '@/components/editor/AvailableElements';

const Sidebar: React.FC = () => {
  return (
    <div className="left-0 top-0 w-[200px] shrink-0 bg-gray-dark">
      <div className="pt-[20px]">
        <AvailableElements />
      </div>
    </div>
  );
};

export default Sidebar;
