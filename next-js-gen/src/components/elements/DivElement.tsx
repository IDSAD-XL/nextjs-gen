import React, { forwardRef, ReactEventHandler, useEffect, useRef } from 'react';
import { Div } from '@/types/pageComponents/components';
import { parseStyles } from '@/utils/parseStyles';

export interface IDivElement {
  componentData: Div;
  children: React.ReactNode;
  path: string[];
}

const DivElement: React.ForwardRefExoticComponent<
  React.PropsWithRef<IDivElement>
> = forwardRef((props, ref) => {
  return (
    <div
      // @ts-ignore
      ref={ref}
      key={props.componentData.id}
      style={parseStyles(props.componentData.styles)}
    >
      {props.children}
    </div>
  );
});

export default DivElement;
