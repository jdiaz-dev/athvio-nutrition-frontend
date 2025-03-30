import React, { ReactNode } from 'react';

function EnablerEditionWrapper({ children, enableEdition }: { children: ReactNode; enableEdition: boolean }) {
  return <>{enableEdition && children}</>;
}

export default EnablerEditionWrapper;
