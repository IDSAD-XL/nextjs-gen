'use client';

import React from 'react';
import { styletron } from '@/styletron/styletron';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';

const THEME = {
  light: 'light',
  dark: 'dark',
};

const ThemeWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = React.useState(THEME.light);

  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>{children}</BaseProvider>
    </StyletronProvider>
  );
};

export default ThemeWrapper;
