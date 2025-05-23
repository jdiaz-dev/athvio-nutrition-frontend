import { Divider, TextField } from '@mui/material';
import React from 'react';
import { PatientQuestionaryDetail } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';

function PatientQuestionaryDetailItem({ questionaryDetail }: { questionaryDetail: PatientQuestionaryDetail }) {
  return (
    <div style={{ display: 'flex', border: '1px solid green', width: '100%', marginBottom: '10px' }}>
      <div style={{ width: '20%' }}>{questionaryDetail.fieldName}</div>
      <Divider orientation="vertical" flexItem />
      <TextField
        // fullWidth
        multiline
        rows={4}
        placeholder="Your Message..."
        value={questionaryDetail.answer}
        variant="standard"
        sx={{
          'pr': 2,
          '& .MuiInput-root:before': { borderBottomColor: 'divider' },
        }}
        style={{ width: '40%' }}
      />
      <Divider orientation="vertical" flexItem />
      <TextField
        // fullWidth
        multiline
        rows={4}
        placeholder="Your Message..."
        value={questionaryDetail.additionalNotes}
        variant="standard"
        sx={{
          'pr': 2,
          '& .MuiInput-root:before': { borderBottomColor: 'divider' },
        }}
        style={{ width: '40%' }}
      />
    </div>
  );
}

export default PatientQuestionaryDetailItem;
