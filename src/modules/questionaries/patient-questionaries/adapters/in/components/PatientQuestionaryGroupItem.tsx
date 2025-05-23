import { Box } from '@mui/system';
import React, { useState } from 'react';
import QuestionaryDetailsDialog from 'src/modules/questionaries/professional-questionaries/adapters/in/dialogs/QuestionaryDetailsDialog';
import { QuestionaryGroup } from 'src/modules/questionaries/professional-questionaries/adapters/out/ProfessionalQuestionary';
import Paper from '@mui/material/Paper';
import { PatientQuestionaryGroup } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';
import PatientQuestionaryDetailItem from 'src/modules/questionaries/patient-questionaries/adapters/in/components/PatientQuestionaryDetailItem';
import { Typography } from '@mui/material';

function PatientQuestionaryGroupItem({ questionaryGroup }: { questionaryGroup: PatientQuestionaryGroup }) {
  return (
    <Box marginTop={2}>
      <Paper style={{ padding: '10px', marginBottom: '10px' }} variant="outlined" elevation={16}>
        <Typography variant="h4" gutterBottom>
          {questionaryGroup.title}
        </Typography>
        {questionaryGroup.questionaryDetails.map((questionaryDetail) => (
          <PatientQuestionaryDetailItem questionaryDetail={questionaryDetail} />
        ))}
      </Paper>
    </Box>
  );
}

export default PatientQuestionaryGroupItem;
