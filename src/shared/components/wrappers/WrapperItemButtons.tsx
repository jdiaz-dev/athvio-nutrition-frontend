import React, { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

const wrapperStyles = makeStyles()(() => {
  return {
    container: { display: 'flex', marginTop: '12.5%' },
  };
});

function WrapperItemButtons({ children }: { children: ReactNode }) {
  const { classes } = wrapperStyles();

  return <div className={classes.container}>{children}</div>;
}

export default WrapperItemButtons;
