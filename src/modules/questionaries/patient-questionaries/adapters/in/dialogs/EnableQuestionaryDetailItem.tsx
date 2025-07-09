import React from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { QuestionaryDetail } from 'src/modules/questionaries/professional-questionaries/adapters/out/ProfessionalQuestionary';
import * as ProfessionalQuestionarySlice from 'src/modules/questionaries/professional-questionaries/adapters/in/slicers/ProfessionalQuestionarySlice';
import { useDispatch } from 'react-redux';

function EnableQuestionaryDetailItem({
  questionaryDetail,
}: {
  questionaryDetail: QuestionaryDetail;
}) {
  const dispatch = useDispatch();

  const manageEnabledHandler = () => {
    dispatch(
      ProfessionalQuestionarySlice.updateIsEnabledQuestionaryDetail({
        questionaryDetail: questionaryDetail.uuid as string,
        isEnabled: !questionaryDetail.isEnabled,
      }),
    );
    dispatch(
      ProfessionalQuestionarySlice.manageIsEnabledQuestionaryDetails({
        questionaryDetail: questionaryDetail.uuid as string,
        isEnabled: !questionaryDetail.isEnabled,
      }),
    );
  };

  return (
    <ListItem
      onClick={manageEnabledHandler}
      style={{ cursor: 'pointer' }}
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
