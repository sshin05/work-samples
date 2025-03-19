import { flex } from '@cerberus/styled-system/patterns';
import React from 'react';

export const DetailCardBody = ({ children }: { children: React.ReactNode }) => {
  return <div className={flex({ gap: '10' })}>{children}</div>;
};
