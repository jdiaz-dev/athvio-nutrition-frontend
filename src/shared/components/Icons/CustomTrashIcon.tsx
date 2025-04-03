import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from 'tss-react/mui';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'src/shared/components/IconButton';

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
      <Tooltip title="delete" placement="right">
        <IconButton>
          <DeleteIcon className={classes.trash} onClick={handler} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default CustomTrashIcon;
