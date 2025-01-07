import React, { ReactNode } from 'react';
import { hoverIcon } from 'src/shared/styles/styles';
import { makeStyles } from 'tss-react/mui';

const styles = makeStyles()(() => {
  return {
    wrapper: {
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      display: 'block',
      padding: '10%',
      ...hoverIcon,
    },
  };
});

function CustomIconWrapper({ children }: { children: ReactNode }) {
  const { classes } = styles();
  return <div className={classes.wrapper}>{children}</div>;
}

export default CustomIconWrapper;
