import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import { PatientQuestionaryGroup } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary';
import PatientQuestionaryDetailItem from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/PatientQuestionaryDetailItem';
import { Typography } from '@mui/material';
import * as PatientQuestionarySlice from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/slicers/PatientQuestionarySlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

function PatientQuestionaryGroupItem({ questionaryGroup }: { questionaryGroup: PatientQuestionaryGroup }) {
  const dispatch = useDispatch();
  const boxRef = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);
  const detailsState = useSelector((state: ReduxStates) => state.patientQuestionary.patientQuestionaryDetails);

  const isPopupOpen = () => !!document.querySelector('.MuiPopover-root, .MuiPopper-root');

  const commit = () => {
    dispatch(
      PatientQuestionarySlice.updateQuestionaryGroupItem({
        uuid: questionaryGroup.uuid,
        questionaryDetails: detailsState,
      }),
    );
    setTouched(false);
  };

  const onEnter = () => {
    if (touched) return;
    dispatch(PatientQuestionarySlice.initializePatientQuestionaryDetails(questionaryGroup.questionaryDetails));
    setTouched(true);
  };

  const onLeave = () => {
    console.log('---leaving');
    if (!touched || isPopupOpen()) return; // dropdown open: don't commit yet
    commit();
  };

  // Fallback: dropdown closed while the pointer is already outside the group
  useEffect(() => {
    if (!touched) return undefined;

    const onMove = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || boxRef.current?.contains(target)) return;
      if (target.closest('.MuiPopover-root, .MuiPopper-root')) return;
      commit();
    };

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touched, detailsState]);

  const questionaryDetails = touched ? detailsState : questionaryGroup.questionaryDetails;

  return (
    <Box ref={boxRef} marginTop={2} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Paper style={{ padding: '10px', marginBottom: '10px' }} variant="outlined" elevation={16}>
        <Typography variant="h4" gutterBottom>
          {questionaryGroup.title}
        </Typography>
        {questionaryDetails.map((questionaryDetail) => (
          <PatientQuestionaryDetailItem key={questionaryDetail.uuid} questionaryDetail={questionaryDetail} />
        ))}
      </Paper>
    </Box>
  );
}
export default PatientQuestionaryGroupItem;
