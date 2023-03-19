import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function ClientCreatedSucessfullyDialog({
  openMessageClientDialog,
  setOpenMessageClientDialog,
  firstName,
  lastName,
}: {
  openMessageClientDialog: boolean;
  setOpenMessageClientDialog: (openDialog: boolean) => void;
  firstName: string;
  lastName: string;
}) {
  return (
    <>
      <Dialog
        open={openMessageClientDialog}
        onClose={setOpenMessageClientDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You added {firstName} {lastName} to your clients sucessfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setOpenMessageClientDialog(false)}>Start counching with {firstName}</Button> */}
          <Button onClick={() => setOpenMessageClientDialog(false)} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
