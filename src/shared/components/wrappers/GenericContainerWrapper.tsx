import React, { ReactNode } from 'react';

function GenericContainerWrapper({ children }: { children: ReactNode }) {
  return <div style={{ width: '90%', margin: '0 auto' }}>{children}</div>;
}

export default GenericContainerWrapper;
