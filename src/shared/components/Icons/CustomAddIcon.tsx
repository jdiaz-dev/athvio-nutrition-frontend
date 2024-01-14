import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from 'tss-react/mui';

const styles = makeStyles()(() => {
  return {
    icon: {
      width: '100%',
      height: '30%',
    },
  };
});
function CustomAddIcon({ handler }: { handler: () => void }) {
  const { classes } = styles();
  return <AddIcon className={classes.icon} onClick={handler} />;
}

export default CustomAddIcon;
