import { useContext, useEffect, useRef } from 'react';

import Grid from '@mui/material/Grid';
import ProfileTabs from 'src/modules/patients/patient-console/profile/in/components/PatientProfileTabs/ProfileTabs';
import TabPersonal from 'src/modules/patients/patient-console/profile/in/components/TabPersonal/TabPersonal';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { usePatient } from 'src/modules/patients/patients/adapters/out/PatientActions';

export default function PatientProfileContainer() {
  const authContext = useContext(AuthContext);
  const patientState = useSelector((state: ReduxStates) => state.patient);
  const { patientId } = useParams();
  const { getPatientForWeb } = usePatient();

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const fetchPatientProfile = async () => {
      await getPatientForWeb({
        patient: {
          professional: authContext.professional,
          patient: patientId as string,
        },
      });
    };
    if (patientId) fetchPatientProfile();
  }, [patientId]);

  return (
    <Grid container spacing={3} style={{ overflowY: 'auto' }}>
      <Grid item xs={12} md={3}>
        <ProfileTabs focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={9}>
        {patientState.uuid.length > 0 && <TabPersonal />}
      </Grid>
    </Grid>
  );
}
