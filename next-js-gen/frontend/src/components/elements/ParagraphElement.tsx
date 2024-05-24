import React, { forwardRef, ReactEventHandler, useEffect, useRef } from 'react';
import { DivElem, PElem } from '@/types/pageComponents/components';
import { parseStyles } from '@/utils/parseStyles';
import { parseAttributes } from '@/utils/parseAttributes';
import { getInnerTextFromAttributes } from '@/utils/getInnerTextFromAttributes';

export interface IPElement {
  componentData: PElem;
  children: React.ReactNode;
  path: string[];
}

const ParagraphElement = forwardRef<HTMLDivElement, IPElement>((props, ref) => {
  return (
    <p
      ref={ref}
      key={props.componentData.id}
      style={parseStyles(props.componentData.styles)}
      {...parseAttributes(props.componentData.attributes)}
    >
      {props.children}
    </p>
  );
});

export default ParagraphElement;
