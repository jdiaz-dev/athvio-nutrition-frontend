import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from 'tss-react/mui';
import { iconStyles } from 'src/shared/styles/styles';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'src/shared/components/IconButton';

function CustomAddIcon({ handler }: { handler: () => void }) {
  const { classes } = iconStyles();

  return (
    <Tooltip title="add" placement="top" onClick={handler}>
      <IconButton>
        <AddIcon className={classes.icon} />
      </IconButton>
    </Tooltip>
  );
}

export default CustomAddIcon;
