import React, { forwardRef, ReactEventHandler, useEffect, useRef } from 'react';
import { DivElem } from '@/types/pageComponents/components';
import { parseStyles } from '@/utils/parseStyles';
import { parseAttributes } from '@/utils/parseAttributes';
import { getInnerTextFromAttributes } from '@/utils/getInnerTextFromAttributes';

export interface IDivElement {
  componentData: DivElem;
  children: React.ReactNode;
  path: string[];
}

const DivElement = forwardRef<HTMLDivElement, IDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      key={props.componentData.id}
      style={parseStyles(props.componentData.styles)}
      {...parseAttributes(props.componentData.attributes)}
    >
      {props.children}
    </div>
  );
});

export default DivElement;
