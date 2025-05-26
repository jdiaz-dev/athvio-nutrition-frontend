import React, { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import Slide, { SlideProps } from '@mui/material/Slide';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export default function SnackbarMesssage({
  openSnackbar,
  setOpenSnackbar,
  message,
  messageCleaner,
}: {
  openSnackbar: boolean;
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
  message: string;
  messageCleaner?: Function;
}) {
  const dispatch = useDispatch();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    setOpenSnackbar(false);
    if (messageCleaner) dispatch(messageCleaner());
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        message={message}
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
}
