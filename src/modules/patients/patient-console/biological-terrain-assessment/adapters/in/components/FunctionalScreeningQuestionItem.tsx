import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import {
  FunctionalScreening,
  FunctionalScreeningScore,
} from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessment';

import { setFunctionalScreeningScore } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/slicers/BiologicalterrainAssessmentSlice';

const SCORE_OPTIONS: {
  value: FunctionalScreeningScore;
  label: string;
}[] = [
  { value: FunctionalScreeningScore.GOOD, label: '🟢 Buena función' },
  { value: FunctionalScreeningScore.MODERATE, label: '🟡 Alteración moderada' },
  { value: FunctionalScreeningScore.SEVERE, label: '🔴 Alteración importante' },
];

export function FunctionalScreeningQuestionItem({ question }: { question: FunctionalScreening }) {
  const dispatch = useDispatch();

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const score = Number(event.target.value) as FunctionalScreeningScore;

    dispatch(
      setFunctionalScreeningScore({
        id: question.uuid,
        score,
      }),
    );
  };

  return (
    <FormControl>
      <RadioGroup row value={question.score ?? ''} onChange={handleScoreChange}>
        {SCORE_OPTIONS.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio size="small" />} label={option.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default FunctionalScreeningQuestionItem;
