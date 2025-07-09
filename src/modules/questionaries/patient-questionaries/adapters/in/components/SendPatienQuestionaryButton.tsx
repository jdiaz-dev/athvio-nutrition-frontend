import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { usePatientQuestionary } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionaryActions';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { buttonStytes } from 'src/shared/styles/styles';
import { ReduxStates } from 'src/shared/types/types';

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
    };
    if (messageOk) handleMessageOk();
  }, [messageOk]);

  const onClickHandler = async () => {
    setMessage('Are you sure you want to send the questionary?');
    setOpenDialog(true);
    setAlert(true);
  };
  return (
    <>
      <Button style={{ width: '200px' }} className={classes.yellowButton} variant="contained" color="secondary" onClick={onClickHandler}>
        Send questionary
      </Button>
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
    </>
  );
}

export default SendPatienQuestionaryButton;
