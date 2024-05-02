import React from 'react';
import { Editor } from '@/types/editor';
import getComponent from '@/utils/getComponent';

export interface IEditor extends Editor {}

const EditorComponent: React.FC<IEditor> = ({ components }) => {
  return (
    <div className="flex w-full grow flex-col bg-lilac">
      {components.map((component, index) => {
        return getComponent(component, index);
      })}
    </div>
  );
};

export default EditorComponent;
