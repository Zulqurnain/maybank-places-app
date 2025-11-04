import React from 'react';
import { Provider as AntProvider } from '@ant-design/react-native';

export const AntDesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AntProvider>
      {children}
    </AntProvider>
  );
};
