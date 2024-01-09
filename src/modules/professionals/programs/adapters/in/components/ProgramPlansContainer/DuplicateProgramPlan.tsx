import React from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { makeStyles } from 'tss-react/mui';

const buttonStyles = makeStyles()(() => {
  return {
    icon: {
      width: '100%',
      height: '30%',
    },
  };
});

function DuplicateProgramPlan() {
  const { classes } = buttonStyles();

  return (
    <>
      <ContentPasteIcon className={classes.icon} />
    </>
  );
}

export default DuplicateProgramPlan;
