import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  Option,
  OptionType,
  QuestionaryAnswer,
} from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary.d';
import {
  toMultipleSelectorItems,
  toPrimitiveAnswer,
} from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/answerEditorHelpers';
import MultipleSelectorAnswerEditor from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/MultipleSelectorAnswerEditor';
import PrimitiveAnswerEditor from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/PrimitiveAnswerEditor';

function QuestionaryDetailAnswerEditor({
  questionaryDetail,
  fieldKey,
  fieldValue,
  placeHolder,
  sliceUpdater,
  optionType,
  options,
}: {
  questionaryDetail: string;
  fieldKey: string;
  fieldValue: QuestionaryAnswer | null | undefined;
  placeHolder: string;
  sliceUpdater: ActionCreatorWithPayload<any>;
  optionType: OptionType;
  options?: Option[] | undefined;
}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(fieldValue);

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  const commit = (newValue: QuestionaryAnswer) => {
    setValue(newValue);
    dispatch(sliceUpdater({ uuid: questionaryDetail, [fieldKey]: newValue }));
  };

  return (
    <Box width={'40%'}>
      {optionType === OptionType.MULTIPLE_SELECTOR ? (
        <MultipleSelectorAnswerEditor
          items={toMultipleSelectorItems(value)}
          options={options ?? []}
          placeHolder={placeHolder}
          onChange={commit}
        />
      ) : (
        <PrimitiveAnswerEditor
          optionType={optionType}
          value={toPrimitiveAnswer(value)}
          options={options}
          placeHolder={placeHolder}
          onChange={commit}
        />
      )}
    </Box>
  );
}

export default QuestionaryDetailAnswerEditor;
