import { IconButton, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { QuestionaryDetail } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';

function ActiveQuestionaryDetail({ questionaryDetail }: { questionaryDetail: QuestionaryDetail }) {
  return (
    <>
      <ListItem
        style={{ border: questionaryDetail.enabled ? '2px solid green' : '' }}
        secondaryAction={
          <IconButton aria-label="enabler">
            <CheckIcon style={{ color: questionaryDetail.enabled ? 'green' : '' }} />
          </IconButton>
        }
      >
        <ListItemText primary={questionaryDetail.associatedQuestion} />
      </ListItem>
    </>
  );
}

export default ActiveQuestionaryDetail;
