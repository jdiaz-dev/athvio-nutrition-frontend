import React, { ReactNode } from 'react';

function SearcherAndSelectorWrapper({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>{children}</div>;
}

export default SearcherAndSelectorWrapper;
