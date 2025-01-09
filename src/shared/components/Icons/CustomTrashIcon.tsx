import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from 'tss-react/mui';

const styles = makeStyles()((theme) => {
  return {
    trash: {
      'marginLeft': '80%',
      'marginBottom': '2px',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  };
});

function CustomTrashIcon({ handler }: { handler: () => void }) {
  const { classes } = styles();
  return (
    <div>
      <DeleteIcon className={classes.trash} onClick={handler} />
    </div>
  );
}

export default CustomTrashIcon;
