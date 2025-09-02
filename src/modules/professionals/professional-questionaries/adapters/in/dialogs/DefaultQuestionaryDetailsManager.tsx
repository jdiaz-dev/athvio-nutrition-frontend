import React, { useContext } from 'react';
import { Button, Card, List } from '@mui/material';

import { QuestionaryDetail, QuestionaryGroup } from 'src/modules/professionals/professional-questionaries/adapters/out/ProfessionalQuestionary';
import EnableQuestionaryDetailItem from 'src/modules/professionals/professional-questionaries/adapters/in/dialogs/EnableQuestionaryDetailItem';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { useProfessionalQuestionary } from 'src/modules/professionals/professional-questionaries/adapters/out/ProfessionalQuestionaryActions';
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
  const isEnabledQuestionaryDetails = useSelector((state: ReduxStates) => state.professionalQuestionary.isEnabledQuestionaryDetails);
  const { enableQuestionaryDetails } = useProfessionalQuestionary();

  const enabledQuestionaryDetailsHandler = async () => {
    await enableQuestionaryDetails({
      professional: authContext.professional,
      questionary,
      questionaryGroup: questionaryGroup.uuid,
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
