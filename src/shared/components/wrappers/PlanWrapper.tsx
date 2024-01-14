import React, { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

const boxStyles = makeStyles()(() => {
  return {
    externalBox: {
      height: '120px',
      width: '100%',
      margin: 'auto',
      backgroundColor: 'white',
      marginTop: '-2px',
      // cursor: 'pointer',
      border: '2px solid red',
    },
  };
});

function PlanWrapper({ children }: { children: ReactNode }) {
  const { classes } = boxStyles();

  return <div className={classes.externalBox}>{children}</div>;
}

export default PlanWrapper;
