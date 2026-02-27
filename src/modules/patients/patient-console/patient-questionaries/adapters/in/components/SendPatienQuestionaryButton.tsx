import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { usePatientQuestionary } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionaryActions';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { buttonStytes } from 'src/shared/styles/styles';
import { ReduxStates } from 'src/shared/types/types';
import { openSnackbar } from 'src/shared/components/Snackbar/snackbar';
import { SnackbarProps } from 'src/shared/types/snackbar';

function SendPatienQuestionaryButton() {
  const authContext = useContext(AuthContext);
  const { patientId } = useParams();
  const questionaryGroupsState = useSelector((state: ReduxStates) => state.patientQuestionary.patientQuestionary);
  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();
  const { sendPatientQuestionary } = usePatientQuestionary();
  const { classes } = buttonStytes();

  useEffect(() => {
    const handleMessageOk = async () => {
      await sendPatientQuestionary({
        professional: authContext.professional,
        patient: patientId as string,
        questionary: questionaryGroupsState.uuid,
      });
      openSnackbar({
        open: true,
        message: 'El cuestionario fue enviado al correo del paciente.',
        variant: 'alert',
        alert: {
          color: 'success',
        },
      } as SnackbarProps);
    };
    if (messageOk) handleMessageOk();
  }, [messageOk]);

  const onClickHandler = async () => {
    setMessage('¿Estás seguro de enviar este cuestionario?');
    setOpenDialog(true);
    setAlert(true);
  };
  return (
    <>
      <Button style={{ width: '200px' }} className={classes.yellowButton} variant="contained" color="secondary" onClick={onClickHandler}>
        Enviar cuestionario
      </Button>
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
    </>
  );
}

export default SendPatienQuestionaryButton;
