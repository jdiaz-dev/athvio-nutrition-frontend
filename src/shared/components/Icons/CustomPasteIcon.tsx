import React from 'react';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { iconStyles } from 'src/shared/styles/styles';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'src/shared/components/IconButton';

function CustomPasteIcon({ handler }: { handler: () => void }) {
  const { classes } = iconStyles();

  return (
    <Tooltip title="paste" placement="top">
      <IconButton>
        <ContentPasteGoIcon className={classes.icon} onClick={handler} />
      </IconButton>
    </Tooltip>
  );
}

export default CustomPasteIcon;
