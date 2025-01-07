import React from 'react';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { iconStyles } from 'src/shared/styles/styles';

function CustomPasteIcon({ handler }: { handler: () => void }) {
  const { classes } = iconStyles();

  return <ContentPasteGoIcon className={classes.icon} onClick={handler} />;
}

export default CustomPasteIcon;
