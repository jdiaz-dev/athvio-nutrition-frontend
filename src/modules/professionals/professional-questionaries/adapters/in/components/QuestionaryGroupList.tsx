import React, { useContext, useEffect } from 'react';
import List from '@mui/material/List';
import { useProfessionalQuestionary } from 'src/modules/professionals/professional-questionaries/adapters/out/ProfessionalQuestionaryActions';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

import QuestionaryGroupItem from 'src/modules/professionals/professional-questionaries/adapters/in/components/QuestionaryGroupItem';
const style = {
  // p: 0,
  width: '85%',
  margin: 'auto',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

function QuestionaryGroupList() {
  const authContext = useContext(AuthContext);

  const { uuid, questionaryGroups } = useSelector((state: ReduxStates) => state.professionalQuestionary.professionalQuestionary);
  const { getQuestionary } = useProfessionalQuestionary();
  useEffect(() => {
    const getQuestionaryHelper = async () => {
      await getQuestionary({ professional: authContext.professional });
    };
    getQuestionaryHelper();
  }, [authContext.professional]);

  return (
    <List sx={style} aria-label="mailbox folders">
      {questionaryGroups.map((questionaryGroup, index) => (
        <QuestionaryGroupItem key={index} questionary={uuid} questionaryGroup={questionaryGroup} />
      ))}
    </List>
  );
}

export default QuestionaryGroupList;
