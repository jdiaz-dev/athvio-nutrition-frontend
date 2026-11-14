import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import { PatientQuestionaryGroup } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary';
import PatientQuestionaryDetailItem from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/PatientQuestionaryDetailItem';
import { Typography } from '@mui/material';
import * as PatientQuestionarySlice from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/slicers/PatientQuestionarySlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

let flushActiveGroup: (() => void) | null = null;

function PatientQuestionaryGroupItem({ questionaryGroup }: { questionaryGroup: PatientQuestionaryGroup }) {
  const dispatch = useDispatch();
  const boxRef = useRef<HTMLDivElement>(null);
  const touchedRef = useRef(false);
  const [touched, setTouched] = useState(false);
  const detailsState = useSelector((state: ReduxStates) => state.patientQuestionary.patientQuestionaryDetails);

  const detailsRef = useRef(detailsState);
  detailsRef.current = detailsState;

  const isPopupOpen = () => !!document.querySelector('.MuiPopover-root, .MuiPopper-root');

  const commit = () => {
    if (!touchedRef.current) return;
    touchedRef.current = false;
    if (flushActiveGroup === commit) flushActiveGroup = null;
    dispatch(
      PatientQuestionarySlice.updateQuestionaryGroupItem({
        uuid: questionaryGroup.uuid,
        questionaryDetails: detailsRef.current,
      }),
    );
    setTouched(false);
  };

  const onEnter = () => {
    if (touchedRef.current) return;
    flushActiveGroup?.();

    touchedRef.current = true;
    flushActiveGroup = commit;
    dispatch(PatientQuestionarySlice.initializePatientQuestionaryDetails(questionaryGroup.questionaryDetails));
    setTouched(true);
  };

  const onLeave = () => {
    setTouched(false);
    if (!touchedRef.current || isPopupOpen()) return;
    commit();
  };

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
  }, [touched]);
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
