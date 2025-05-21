import React, { useContext, useEffect } from 'react';
import List from '@mui/material/List';
import { useProfessionalQuestionary } from 'src/modules/questionaries/professional-questionaries/adapters/out/ProfessionalQuestionaryActions';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

import QuestionaryGroupItem from 'src/modules/questionaries/professional-questionaries/adapters/in/components/QuestionaryGroupItem';
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

  const { _id, questionaryGroups } = useSelector((state: ReduxStates) => state.professionalQuestionary.professionalQuestionary);
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
        <QuestionaryGroupItem key={index} questionary={_id} questionaryGroup={questionaryGroup} />
      ))}
    </List>
  );
}

export default QuestionaryGroupList;
