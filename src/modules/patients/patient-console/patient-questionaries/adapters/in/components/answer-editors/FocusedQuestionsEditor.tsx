import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  FocusedQuestion,
  FocusedQuestionAnswer,
  PrimitiveAnswer,
} from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary.d';
import { upsertFocusedQuestionAnswer } from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/answerEditorHelpers';
import PrimitiveAnswerEditor from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/PrimitiveAnswerEditor';

function FocusedQuestionsEditor({
  optionName,
  focusedQuestions,
  focusedAnswers,
  onChange,
}: {
  optionName: string;
  focusedQuestions: FocusedQuestion[];
  focusedAnswers: FocusedQuestionAnswer[] | undefined;
  onChange: (focusedAnswers: FocusedQuestionAnswer[]) => void;
}) {
  const answerOf = (focusedQuestion: FocusedQuestion): PrimitiveAnswer | undefined =>
    focusedAnswers?.find((item) => item.professionalFocusedQuestion === focusedQuestion.uuid)?.answer;

  const changeHandler = (focusedQuestion: FocusedQuestion, answer: PrimitiveAnswer) =>
    onChange(upsertFocusedQuestionAnswer(focusedAnswers, focusedQuestion, answer));

  return (
    <Box style={{ marginTop: 8, paddingLeft: 12, borderLeft: '2px solid #e0e0e0' }}>
      <Typography variant="subtitle2">{optionName}</Typography>
      {focusedQuestions.map((focusedQuestion) => (
        <Box key={focusedQuestion.uuid} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <Typography variant="body2" style={{ width: '55%' }} title={focusedQuestion.associatedQuestion}>
            {focusedQuestion.fieldName}
          </Typography>
          <Box style={{ width: '45%' }}>
            <PrimitiveAnswerEditor
              optionType={focusedQuestion.optionType}
              value={answerOf(focusedQuestion)}
              options={focusedQuestion.options}
              placeHolder="Respuesta..."
              onChange={(answer) => changeHandler(focusedQuestion, answer)}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default FocusedQuestionsEditor;
