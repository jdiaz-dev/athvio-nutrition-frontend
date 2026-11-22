import React from 'react';
import { OptionType, PrimitiveAnswer } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary.d';
import { toStringAnswer } from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/answerEditorHelpers';
import TextAnswerEditor from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/TextAnswerEditor';
import SelectorAnswerEditor from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/SelectorAnswerEditor';
import BooleanAnswerEditor from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/BooleanAnswerEditor';
import HourAnswerEditor from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/HourAnswerEditor';

function PrimitiveAnswerEditor({
  optionType,
  value,
  options,
  placeHolder,
  onChange,
}: {
  optionType: OptionType;
  value: PrimitiveAnswer | undefined;
  options?: { uuid: string; name: string }[];
  placeHolder: string;
  onChange: (value: PrimitiveAnswer) => void;
}) {
  switch (optionType) {
    case OptionType.SELECTOR:
      return <SelectorAnswerEditor value={toStringAnswer(value)} options={options ?? []} placeHolder={placeHolder} onChange={onChange} />;
    case OptionType.BOOLEAN:
      return <BooleanAnswerEditor value={value} placeHolder={placeHolder} onChange={onChange} />;
    case OptionType.HOUR:
      return <HourAnswerEditor value={toStringAnswer(value)} onChange={onChange} />;
    case OptionType.TEXT:
    default:
      return <TextAnswerEditor value={toStringAnswer(value)} placeHolder={placeHolder} onChange={onChange} />;
  }
}

export default PrimitiveAnswerEditor;
