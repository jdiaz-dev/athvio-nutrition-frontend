import React from 'react';
import { Divider } from '@mui/material';
import { PatientQuestionaryDetail } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';
import QuestionaryDetailFieldEditor from 'src/modules/questionaries/patient-questionaries/adapters/in/components/QuestionaryDetailFieldEditor';
import * as PatientQuestionarySlice from 'src/modules/questionaries/patient-questionaries/adapters/in/slicers/PatientQuestionarySlice';

function PatientQuestionaryDetailItem({ questionaryDetail }: { questionaryDetail: PatientQuestionaryDetail }) {
  return (
    <div style={{ display: 'flex', border: '1px solid green', width: '100%', marginBottom: '10px' }}>
      <div style={{ width: '20%' }}>{questionaryDetail.fieldName}</div>
      <Divider orientation="vertical" flexItem />
      <QuestionaryDetailFieldEditor
        questionaryDetail={questionaryDetail._id}
        sliceUpdater={PatientQuestionarySlice.updateAnswer}
        fieldKey="answer"
        fieldValue={questionaryDetail.answer}
      />
      <Divider orientation="vertical" flexItem />
      <QuestionaryDetailFieldEditor
        questionaryDetail={questionaryDetail._id}
        fieldKey="additionalNotes"
        sliceUpdater={PatientQuestionarySlice.updateAdditionalNotes}
        fieldValue={questionaryDetail.additionalNotes}
      />
    </div>
  );
}

export default PatientQuestionaryDetailItem;
