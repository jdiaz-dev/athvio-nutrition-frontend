import React, { MouseEventHandler } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function CloseDialogIcon({
  closedIconDialog,
  closeIconDialogHandler,
}: {
  closedIconDialog: boolean;
  closeIconDialogHandler: MouseEventHandler;
}) {
  return (
    <div>
      {closedIconDialog ? (
        <IconButton
          aria-label="close"
          onClick={closeIconDialogHandler}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </div>
  );
}

export default CloseDialogIcon;
