import React, { forwardRef, ReactEventHandler, useEffect, useRef } from 'react';
import { Div } from '@/types/pageComponents/components';
import { parseStyles } from '@/utils/parseStyles';

export interface IDivElement {
  componentData: Div;
  children: React.ReactNode;
  path: string[];
}

const DivElement = forwardRef<HTMLDivElement, IDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      key={props.componentData.id}
      style={parseStyles(props.componentData.styles)}
    >
      {props.children}
    </div>
  );
});

export default DivElement;
