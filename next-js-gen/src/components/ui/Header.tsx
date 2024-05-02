import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-[80px] w-screen bg-gray-medium">
      <div className="container px-[1rem]">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-extraLarge font-bold text-white">Logo</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
