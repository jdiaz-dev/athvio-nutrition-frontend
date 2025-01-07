import React from 'react';
import { makeStyles } from 'tss-react/mui';
import ZoomOutMapTwoToneIcon from '@mui/icons-material/ZoomOutMapTwoTone';

const styles = makeStyles()(() => {
  return {
    icon: {
      width: '39%',
      marginRight: '3px',
      rotate: '45deg',
      cursor: 'grab',
    },
  };
});

function CustomDraggable() {
  const { classes } = styles();

  return <ZoomOutMapTwoToneIcon className={classes.icon} />;
}

export default CustomDraggable;
