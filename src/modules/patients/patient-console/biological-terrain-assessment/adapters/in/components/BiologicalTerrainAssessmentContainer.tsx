import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FunctionalScreeningQuestions from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/components/FunctionalScreeningQuestions';
import GeneralObservations from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/components/GeneralObservations';
import Interpreation from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/components/Interpreation';
import SaveBiologicalTerrainAssessment from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/components/SaveBiologicalTerrainAssessment';
import { useBiologicalTerrainAssessmentActions } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessmentActions';

function BiologicalTerrainAssessmentContainer() {
  const { patientId } = useParams();
  const { getBiologicalTerrainAssessment } = useBiologicalTerrainAssessmentActions();
  useEffect(() => {
    getBiologicalTerrainAssessment(patientId as string);
  }, []);

  return (
    <div style={{ width: '100%', overflowY: 'auto' }}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <SaveBiologicalTerrainAssessment />
        <GeneralObservations />
        <FunctionalScreeningQuestions />
        <Interpreation />
      </Container>
    </div>
  );
}

export default BiologicalTerrainAssessmentContainer;
