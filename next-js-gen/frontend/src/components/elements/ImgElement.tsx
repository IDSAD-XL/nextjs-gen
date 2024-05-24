import React, { forwardRef } from 'react';
import { ImgElem } from '@/types/pageComponents/components';
import { parseStyles } from '@/utils/parseStyles';
import { parseAttributes } from '@/utils/parseAttributes';

export interface IImgElement {
  componentData: ImgElem;
  children: React.ReactNode;
  path: string[];
}

const ImgElement = forwardRef<HTMLDivElement, IImgElement>((props, ref) => {
  return (
    <img
      // @ts-ignore
      ref={ref}
      key={props.componentData.id}
      style={parseStyles(props.componentData.styles)}
      {...parseAttributes(props.componentData.attributes)}
    />
  );
});

export default ImgElement;
