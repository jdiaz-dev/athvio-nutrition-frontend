import React, { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

const styles = makeStyles()((theme) => {
  return {
    wrapper: {
      'width': '100%',
      'height': '100%',
      'cursor': 'pointer',
      'display': 'block',
      'padding': '10%',
      '&:hover': {
        backgroundColor: '#7ACBFB', //theme.palette.primary.dark,
      },
      'opacity': '1',
    },
  };
});

function CustomIconWrapper({ children }: { children: ReactNode }) {
  const { classes } = styles();
  return <div className={classes.wrapper}>{children}</div>;
}

export default CustomIconWrapper;
