import React from 'react';
import PanToolIcon from '@mui/icons-material/PanTool';
import { makeStyles } from 'tss-react/mui';

const styles = makeStyles()(() => {
  return {
    icon: {
      width: '45%',
      marginRight: '3px',
    },
  };
});

function CustomDraggable() {
  const { classes } = styles();

  return <PanToolIcon className={classes.icon} />;
}

export default CustomDraggable;
