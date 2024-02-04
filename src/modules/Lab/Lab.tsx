import React, { ReactNode } from 'react';

function CompC() {
  return <div>C </div>;
}
function CompB({ children }: { children: ReactNode }) {
  return <div> B{children}</div>;
}

function CompA({ children }: { children: ReactNode }) {
  console.log('-------comp', children);
  return (
    <div>
      This is my child
      {children}
    </div>
  );
}

function Lab() {
  return (
    <div>
      los childs
      <CompA>
        <CompB>
          <CompC />
        </CompB>
      </CompA>
    </div>
  );
}

export default Lab;
