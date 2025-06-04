import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { usePatientQuestionary } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionaryActions';
import SnackbarMesssage from 'src/shared/components/SnackbarMessage';
import { ReduxStates } from 'src/shared/types/types';

function SaveQuestionaryButton() {
  const authContext = useContext(AuthContext);
  const { patientId } = useParams();
  const questionaryGroupsState = useSelector((state: ReduxStates) => state.patientQuestionary.patientQuestionary);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { updateAnswersAndAdditionalNotes } = usePatientQuestionary();

  const onClickHandler = async () => {
    setOpenSnackbar(true);

    await updateAnswersAndAdditionalNotes({
      professional: authContext.professional,
      patient: patientId as string,
      questionary: questionaryGroupsState._id,
      questionaryGroups: questionaryGroupsState.questionaryGroups
        .filter((group) => group.questionaryDetails.length > 0)
        .map(({ _id, questionaryDetails }) => ({
          questionaryGroup: _id,
          questionaryDetails: questionaryDetails.map(({ _id, answer, additionalNotes }) => ({
            questionaryDetail: _id,
            answer,
            additionalNotes,
          })),
        })),
    });
  };
  return (
    <>
      <Button style={{ width: '200px' }} variant="contained" onClick={onClickHandler}>
        Save
      </Button>
      {openSnackbar && (
        <SnackbarMesssage openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} message={'El questionario fue actualizado'} />
      )}
    </>
  );
}

export default SaveQuestionaryButton;
