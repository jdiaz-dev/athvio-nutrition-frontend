import React, { ReactNode, useState } from 'react';

type Visibility = React.CSSProperties['visibility'];

function WrapperItemButtons({ children }: { children: ReactNode }) {
  const [displayIcons, setDisplayIcons] = useState<Visibility>('hidden');

  return (
    <div style={{ width: '100%' }} onMouseEnter={() => setDisplayIcons('visible')} onMouseLeave={() => setDisplayIcons('hidden')}>
      <div
        style={{
          width: '70%',
          margin: '0 auto',
          display: 'flex',
          background: 'black',
          visibility: displayIcons,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default WrapperItemButtons;
