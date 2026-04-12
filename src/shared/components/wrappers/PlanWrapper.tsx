import React, { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

const boxStyles = makeStyles()((theme) => {
  return {
    externalBox: {
      minHeight: '90px',
      width: '100%',
      margin: '0 auto',
      backgroundColor: theme.palette.background.paper,
      marginTop: '-2px',
    },
  };
});

function PlanWrapper({ children }: { children: ReactNode }) {
  const { classes } = boxStyles();

  return <div className={classes.externalBox}>{children}</div>;
}

export default PlanWrapper;
