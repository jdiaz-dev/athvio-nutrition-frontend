import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from 'tss-react/mui';
import { iconStyles } from 'src/shared/styles/styles';

function CustomAddIcon({ handler }: { handler: () => void }) {
  const { classes } = iconStyles();
  return <AddIcon className={classes.icon} onClick={handler} />;
}

export default CustomAddIcon;
