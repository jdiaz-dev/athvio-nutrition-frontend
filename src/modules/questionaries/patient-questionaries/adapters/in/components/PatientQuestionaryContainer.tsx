import React from 'react';
import PatientQuestionaryGroupList from 'src/modules/questionaries/patient-questionaries/adapters/in/components/PatientQuestionaryGroupList';
import SaveQuestionaryButton from 'src/modules/questionaries/patient-questionaries/adapters/in/components/SaveQuestionaryButton';

function PatientQuestionaryContainer() {
  return (
    <div style={{ width: '100%', overflowY: 'auto' }}>
      <SaveQuestionaryButton />
      <PatientQuestionaryGroupList />
    </div>
  );
}

export default PatientQuestionaryContainer;
