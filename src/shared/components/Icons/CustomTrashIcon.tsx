import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from 'tss-react/mui';
import { hoverIcon } from 'src/shared/styles/styles';

const styles = makeStyles()(() => {
  return {
    trash: {
      ...hoverIcon,
      marginLeft: '80%',
      marginBottom: '2px',
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
