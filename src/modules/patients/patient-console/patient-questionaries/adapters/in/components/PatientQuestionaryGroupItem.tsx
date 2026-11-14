import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import { PatientQuestionaryGroup } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary';
import PatientQuestionaryDetailItem from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/PatientQuestionaryDetailItem';
import { Typography } from '@mui/material';
import * as PatientQuestionarySlice from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/slicers/PatientQuestionarySlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

const POPUP_SELECTOR = '.MuiPopover-root, .MuiPopper-root';
let flushActiveGroup: (() => void) | null = null;

function PatientQuestionaryGroupItem({ questionaryGroup }: { questionaryGroup: PatientQuestionaryGroup }) {
  const dispatch = useDispatch();
  const boxRef = useRef<HTMLDivElement>(null);
  const touchedRef = useRef(false);
  const [touched, setTouched] = useState(false);
  const detailsState = useSelector((state: ReduxStates) => state.patientQuestionary.patientQuestionaryDetails);

  const detailsRef = useRef(detailsState);
  detailsRef.current = detailsState;

  const existChildDropdownOpen = () => !!boxRef.current?.querySelector('[aria-expanded="true"]');

  const saveQuestionaryGroup = () => {
    if (!touchedRef.current) return;
    touchedRef.current = false;
    if (flushActiveGroup === saveQuestionaryGroup) flushActiveGroup = null;
    dispatch(
      PatientQuestionarySlice.updateQuestionaryGroupItem({
        uuid: questionaryGroup.uuid,
        questionaryDetails: detailsRef.current,
      }),
    );
    setTouched(false);
  };

  const onTouch = () => {
    if (touchedRef.current) return;
    flushActiveGroup?.();
    touchedRef.current = true;
    flushActiveGroup = saveQuestionaryGroup;
    dispatch(PatientQuestionarySlice.initializePatientQuestionaryDetails(questionaryGroup.questionaryDetails));
    setTouched(true);
  };

  const onLeave = () => {
    if (!touchedRef.current || existChildDropdownOpen()) return;
    saveQuestionaryGroup();
  };

  useEffect(() => {
    if (!touched) return undefined;

    const commitWhenPointerIsOutsideBox = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || boxRef.current?.contains(target)) return;
      if (target.closest(POPUP_SELECTOR)) return;
      if (existChildDropdownOpen()) return;
      saveQuestionaryGroup();
    };

    document.addEventListener('mousemove', commitWhenPointerIsOutsideBox);
    return () => document.removeEventListener('mousemove', commitWhenPointerIsOutsideBox);
  }, [touched]);

  const questionaryDetails = touched ? detailsState : questionaryGroup.questionaryDetails;

  return (
    <Box ref={boxRef} marginTop={2} onMouseDownCapture={onTouch} onMouseLeave={onLeave}>
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
