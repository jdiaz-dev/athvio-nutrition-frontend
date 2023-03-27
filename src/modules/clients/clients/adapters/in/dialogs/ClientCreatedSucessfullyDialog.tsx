import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function ClientCreatedSucessfullyDialog({
  openMessageDialog,
  setOpenMessageDialog,
  messageDialog,
}: {
  openMessageDialog: boolean;
  setOpenMessageDialog: (openDialog: boolean) => void;
  messageDialog: string;
}) {
  return (
    <>
      <Dialog
        open={openMessageDialog}
        onClose={setOpenMessageDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{messageDialog}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setOpenMessageDialog(false)}>Start counching with {firstName}</Button> */}
          <Button onClick={() => setOpenMessageDialog(false)} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
