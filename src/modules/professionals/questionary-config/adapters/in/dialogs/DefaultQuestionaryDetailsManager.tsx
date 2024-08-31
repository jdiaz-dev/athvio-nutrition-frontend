import React, { useContext } from 'react';
import { Button, Card, List } from '@mui/material';

import { QuestionaryDetail, QuestionaryGroup } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import EnableQuestionaryDetailItem from 'src/modules/professionals/questionary-config/adapters/in/dialogs/EnableQuestionaryDetailItem';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { useQuestionaryConfig } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfigActions';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';

function DefaultQuestionaryDetailsManager({
  questionary,
  questionaryGroup,
  questionaryDetails,
  setOpenQuestionaryGroupDialog,
}: {
  questionary: string;
  questionaryDetails: QuestionaryDetail[];
  questionaryGroup: QuestionaryGroup;
  setOpenQuestionaryGroupDialog: (openProgram: boolean) => void;
}) {
  const authContext = useContext(AuthContext);
  const isEnabledQuestionaryDetails = useSelector((state: ReduxStates) => state.questionaryConfig.isEnabledQuestionaryDetails);
  const { enableQuestionaryDetails } = useQuestionaryConfig();

  const enabledQuestionaryDetailsHandler = async () => {
    await enableQuestionaryDetails({
      professional: authContext.professional,
      questionary,
      questionaryGroup: questionaryGroup._id,
      questionaryDetails: isEnabledQuestionaryDetails,
    });
    setOpenQuestionaryGroupDialog(false);
  };
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {questionaryDetails.map((questionaryDetail, index) => (
          <EnableQuestionaryDetailItem key={index} questionaryDetail={questionaryDetail} />
        ))}
      </List>
      <Card variant="outlined">
        <Button variant="contained" onClick={enabledQuestionaryDetailsHandler}>
          Save
        </Button>
      </Card>
    </>
  );
}

export default DefaultQuestionaryDetailsManager;
