import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function MessageDialog({
  openDialog,
  setOpenDialog,
  message,
  setMessageOk,
  alert,
}: {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  message: string;
  setMessageOk?: (openDialog: boolean) => void;
  alert?: boolean;
}) {
  return (
    <>
      <Dialog open={openDialog} onClose={setOpenDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
          {alert && (
            <Button
              onClick={() => {
                setOpenDialog(false);
                if (setMessageOk) setMessageOk(false);
              }}
              autoFocus
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={() => {
              setOpenDialog(false);
              if (setMessageOk) setMessageOk(true);
            }}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MessageDialog;
