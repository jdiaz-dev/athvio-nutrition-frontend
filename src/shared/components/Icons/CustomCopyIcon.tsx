import React from 'react';
import { makeStyles } from 'tss-react/mui';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'src/shared/components/IconButton';

const styles = makeStyles()(() => {
  return {
    icon: {
      width: '100%',
      marginRight: '3px',
    },
  };
});

function CustomCopyIcon({ handler }: { handler: () => void }) {
  const { classes } = styles();

  return (
    <Tooltip title="copy" placement="top" onClick={handler}>
      <IconButton>
        <ContentCopyTwoToneIcon className={classes.icon} />
      </IconButton>
    </Tooltip>
  );
}

export default CustomCopyIcon;
