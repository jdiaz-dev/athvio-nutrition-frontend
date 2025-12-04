import React from 'react';
import PatientQuestionaryGroupList from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/PatientQuestionaryGroupList';
import SaveQuestionaryButton from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/SaveQuestionaryButton';
import SendPatienQuestionaryButton from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/SendPatienQuestionaryButton';

function PatientQuestionaryContainer() {
  return (
    <div style={{ width: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'end', margin: '0 auto', width: '85%', marginTop: '1.1%' }}>
        <SendPatienQuestionaryButton />
        <SaveQuestionaryButton />
      </div>
      <PatientQuestionaryGroupList />
    </div>
  );
}

export default PatientQuestionaryContainer;
