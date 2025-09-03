import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

import { usePatientQuestionary } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionaryActions';
import { useParams } from 'react-router-dom';
import PatientQuestionaryGroupItem from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/PatientQuestionaryGroupItem';
import { Box } from '@mui/system';
import GenericContainerWrapper from 'src/shared/components/wrappers/GenericContainerWrapper';

function PatientQuestionaryGroupList() {
  const authContext = useContext(AuthContext);
  const { patientId } = useParams();

  const questionaryGroupsState = useSelector((state: ReduxStates) => state.patientQuestionary.patientQuestionary.questionaryGroups);
  const { getPatientQuestionary } = usePatientQuestionary();

  useEffect(() => {
    const getQuestionaryHelper = async () => {
      await getPatientQuestionary({ professional: authContext.professional, patient: patientId as string });
    };
    if (patientId) getQuestionaryHelper();
  }, [authContext.professional, patientId]);

  return (
    <div>
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
