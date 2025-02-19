import React from 'react';
import { Card, Dialog, DialogContent } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import OptionTabs from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/OptionTabs';

function PlatientPlansGeneratorDialog({
  openPlatientPlansGeneratorDialog,
  setOpenPlatientPlansGeneratorDialog,
}: {
  openPlatientPlansGeneratorDialog: boolean;
  setOpenPlatientPlansGeneratorDialog: (openDialog: boolean) => void;
}) {
  const { classes } = cardStyles();

  return (
    <>
      <Dialog
        open={openPlatientPlansGeneratorDialog}
        onClose={() => setOpenPlatientPlansGeneratorDialog(false)}
        scroll="paper"
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent dividers={true}>
          <Card className={classes.card} variant="outlined">
            <OptionTabs />
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PlatientPlansGeneratorDialog;

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      padding: '0px',
    },
    form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column', // Align items vertically
      alignItems: 'center', // Center items horizontally
      justifyContent: 'center', // Center items vertically
      padding: '20px 0',
    },
    textField: {
      width: '90%',
      marginTop: '15px',
    },
    button: {
      width: '90%',
      color: 'white',
      height: '45px',
      marginTop: '15px',
      marginBottom: '15px',
    },
  };
});
