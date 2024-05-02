'use client';
import React from 'react';
import AvailableElements from '@/components/editor/AvailableElements';

const Sidebar: React.FC = () => {
  return (
    <div className="left-0 top-0 w-[350px] shrink-0 bg-gray-dark">
      <div className="pt-[40px]">
        <AvailableElements />
      </div>
    </div>
  );
};

export default Sidebar;
