import React, { useEffect } from 'react';
import { Div } from '@/types/pageComponents/components';
import { parseStyles } from '@/utils/parseStyles';

export interface IDivElement extends Div {
  children: React.ReactNode;
}

const DivElement: React.FC<IDivElement> = ({ styles, children }) => {
  useEffect(() => {
    console.log(parseStyles(styles));
  }, []);
  return <div style={parseStyles(styles)}>{children}</div>;
};

export default DivElement;
