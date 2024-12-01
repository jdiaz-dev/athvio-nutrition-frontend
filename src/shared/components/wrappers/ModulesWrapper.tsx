import React, { ReactNode } from 'react';

function ModulesWrapper({ children }: { children: ReactNode }) {
  return <div style={{ width: '90%', margin: '0 auto' }}>{children}</div>;
}

export default ModulesWrapper;
