import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { usePatientQuestionary } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionaryActions';
import { openSnackbar } from 'src/shared/components/Snackbar/snackbar';
import { SnackbarProps } from 'src/shared/types/snackbar';
import { ReduxStates } from 'src/shared/types/types';

function SaveQuestionaryButton() {
  const authContext = useContext(AuthContext);
  const { patientId } = useParams();
  const questionaryGroupsState = useSelector((state: ReduxStates) => state.patientQuestionary.patientQuestionary);

  const { updateAnswersAndAdditionalNotes } = usePatientQuestionary();

  const onClickHandler = async () => {
    await updateAnswersAndAdditionalNotes({
      professional: authContext.professional,
      patient: patientId as string,
      questionary: questionaryGroupsState.uuid,
      questionaryGroups: questionaryGroupsState.questionaryGroups
        .filter((group) => group.questionaryDetails.length > 0)
        .map(({ uuid, questionaryDetails }) => ({
          questionaryGroup: uuid,
          questionaryDetails: questionaryDetails.map(({ uuid, answer, additionalNotes }) => ({
            questionaryDetail: uuid,
            answer,
            additionalNotes,
          })),
        })),
    });
    openSnackbar({
      open: true,
      message: 'El questionario fue actualizado exitosamente.',
      variant: 'alert',
      alert: {
        color: 'success',
      },
    } as SnackbarProps);
  };
  return (
    <>
      <Button style={{ width: '200px' }} variant="contained" onClick={onClickHandler}>
        Save
      </Button>
    </>
  );
}

export default SaveQuestionaryButton;
