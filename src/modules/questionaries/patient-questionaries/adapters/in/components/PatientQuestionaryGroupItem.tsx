import React, { useState } from 'react';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import { PatientQuestionaryGroup } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';
import PatientQuestionaryDetailItem from 'src/modules/questionaries/patient-questionaries/adapters/in/components/PatientQuestionaryDetailItem';
import { Typography } from '@mui/material';
import * as PatientQuestionarySlice from 'src/modules/questionaries/patient-questionaries/adapters/in/slicers/PatientQuestionarySlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

function PatientQuestionaryGroupItem({ questionaryGroup }: { questionaryGroup: PatientQuestionaryGroup }) {
  const dispatch = useDispatch();
  const [questionaryGroupTouched, setQuestionaryGroupTouched] = useState(false);
  const questionaryDetailsState = useSelector((state: ReduxStates) => state.patientQuestionary.patientQuestionaryDetails);

  const onClickHandler = () => {
    if (!questionaryGroupTouched) {
      dispatch(PatientQuestionarySlice.initializePatientQuestionaryDetails(questionaryGroup.questionaryDetails));
      setQuestionaryGroupTouched(true);
    }
  };
  const mouseLeaveHandler = () => {
    if (questionaryGroupTouched) {
      dispatch(
        PatientQuestionarySlice.updateQuestionaryGroupItem({ _id: questionaryGroup._id, questionaryDetails: questionaryDetailsState }),
      );
      setQuestionaryGroupTouched(false);
    }
  };

  const questionaryDetails = questionaryGroupTouched ? questionaryDetailsState : questionaryGroup.questionaryDetails;
  return (
    <Box marginTop={2} onClick={onClickHandler} onMouseLeave={mouseLeaveHandler}>
      <Paper style={{ padding: '10px', marginBottom: '10px' }} variant="outlined" elevation={16}>
        <Typography variant="h4" gutterBottom>
          {questionaryGroup.title}
        </Typography>
        {questionaryDetails.map((questionaryDetail) => (
          <PatientQuestionaryDetailItem questionaryDetail={questionaryDetail} />
        ))}
      </Paper>
    </Box>
  );
}

export default PatientQuestionaryGroupItem;
