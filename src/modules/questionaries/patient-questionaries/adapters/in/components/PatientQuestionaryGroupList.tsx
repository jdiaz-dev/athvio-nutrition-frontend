import React, { useContext, useEffect } from 'react';
import List from '@mui/material/List';
import { useProfessionalQuestionary } from 'src/modules/questionaries/professional-questionaries/adapters/out/ProfessionalQuestionaryActions';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

import QuestionaryGroupItem from 'src/modules/questionaries/professional-questionaries/adapters/in/components/QuestionaryGroupItem';
import { usePatientQuestionary } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionaryActions';
import { useParams } from 'react-router-dom';
import PatientQuestionaryGroupItem from 'src/modules/questionaries/patient-questionaries/adapters/in/components/PatientQuestionaryGroupItem';
import { Box } from '@mui/system';
import GenericContainerWrapper from 'src/shared/components/wrappers/GenericContainerWrapper';

function PatientQuestionaryGroupList() {
  const authContext = useContext(AuthContext);
  const { patientId } = useParams();

  const questionaryGroupsState = useSelector((state: ReduxStates) => state.patientQuestionary.patientQuestionaryGroups);
  const { getPatientQuestionary } = usePatientQuestionary();

  useEffect(() => {
    const getQuestionaryHelper = async () => {
      await getPatientQuestionary({ professional: authContext.professional, patient: patientId as string });
    };
    if (patientId) getQuestionaryHelper();
  }, [authContext.professional, patientId]);

  return (
    <div style={{ width: '100%', overflowY: 'auto' }}>
      <GenericContainerWrapper>
        <Box
          sx={{
            width: '95%',
            margin: 'auto',
          }}
        >
          {questionaryGroupsState.length &&
            questionaryGroupsState.map((questionaryGroup, index) => (
              <PatientQuestionaryGroupItem key={index} questionaryGroup={questionaryGroup} />
            ))}
        </Box>
      </GenericContainerWrapper>
    </div>
  );
}

export default PatientQuestionaryGroupList;
