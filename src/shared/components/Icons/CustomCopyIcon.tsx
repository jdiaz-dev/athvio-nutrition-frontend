import React from 'react';
import { makeStyles } from 'tss-react/mui';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

const styles = makeStyles()(() => {
  return {
    icon: {
      width: '45%',
      marginRight: '3px',
    },
  };
});

function CustomCopyIcon({ handler }: { handler: () => void }) {
  const { classes } = styles();

  return <ContentCopyTwoToneIcon className={classes.icon} onClick={handler} />;
}

export default CustomCopyIcon;
