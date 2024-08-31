import React from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { QuestionaryDetail } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import * as QuestionaryConfigSlice from 'src/modules/professionals/questionary-config/adapters/in/slicers/QuestionaryConfigSlice';
import { useDispatch } from 'react-redux';

function EnableQuestionaryDetailItem({
  questionaryDetail,
}: {
  questionaryDetail: QuestionaryDetail;
}) {
  const dispatch = useDispatch();

  const manageEnabledHandler = () => {
    dispatch(
      QuestionaryConfigSlice.updateIsEnabledQuestionaryDetail({
        questionaryDetail: questionaryDetail._id as string,
        isEnabled: !questionaryDetail.isEnabled,
      }),
    );
    dispatch(
      QuestionaryConfigSlice.manageIsEnabledQuestionaryDetails({
        questionaryDetail: questionaryDetail._id as string,
        isEnabled: !questionaryDetail.isEnabled,
      }),
    );
  };

  return (
    <ListItem
      onClick={manageEnabledHandler}
      style={{ border: questionaryDetail.isEnabled ? '2px solid green' : '', cursor: 'pointer' }}
      secondaryAction={
        <IconButton aria-label="enabler">
          <CheckIcon style={{ color: questionaryDetail.isEnabled ? 'green' : '' }} />
        </IconButton>
      }
    >
      <ListItemText primary={questionaryDetail.associatedQuestion} />
    </ListItem>
  );
}

export default EnableQuestionaryDetailItem;
