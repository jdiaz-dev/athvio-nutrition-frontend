import { Card, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import DatabaseSelector from 'src/shared/components/DatabaseSelector';

function ImportMealDialog({
  openImportMealDialog,
  setOpenImportMealDialog,
}: {
  openImportMealDialog: boolean;
  setOpenImportMealDialog: (param: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [database, setDatabase] = useState('');
  const [closeIconDialog, setCloseIconDialog] = useState(true);

  const closeIconDialogHandler = () => {
    setOpenImportMealDialog(false);
  };
  const importMealHandler = () => {};
  useEffect(() => {}, [database]);
  return (
    <Dialog
      open={openImportMealDialog}
      onClose={closeIconDialogHandler}
      scroll="body"
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create your custom meal
        <CloseDialogIcon closedIconDialog={closeIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
      </DialogTitle>
      <DialogContent dividers={true}>
        <Card style={{ padding: '20px', marginBottom: '15px' }} variant="outlined">
          <DatabaseSelector database={database} setDatabase={setDatabase} />
        </Card>
        <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={importMealHandler} />
      </DialogContent>
    </Dialog>
  );
}

export default ImportMealDialog;
