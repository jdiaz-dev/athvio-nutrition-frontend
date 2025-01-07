import { R } from '@fullcalendar/core/internal-common';
import React, { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

const boxStyles = makeStyles()(() => {
  return {
    externalBox: {
      minHeight: '90px',
      width: '100%',
      margin: '0 auto',
      backgroundColor: '#1e1e1e',
      marginTop: '-2px',
      // cursor: 'pointer',
    },
  };
});

function PlanWrapper({ children }: { children: ReactNode }) {
  const { classes } = boxStyles();

  return <div className={classes.externalBox}>{children}</div>;
}

export default PlanWrapper;
