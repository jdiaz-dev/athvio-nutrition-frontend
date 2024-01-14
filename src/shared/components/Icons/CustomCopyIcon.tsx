import React from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { makeStyles } from 'tss-react/mui';

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

  return <ContentPasteIcon className={classes.icon} onClick={handler} />;
}

export default CustomCopyIcon;
