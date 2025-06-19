import { useContext, useEffect, useRef } from 'react';

import Grid from '@mui/material/Grid';
import ProfileTabs from 'src/modules/patients/patient-console/profile/in/PatientProfileTabs/ProfileTabs';
import TabPersonal from 'src/modules/patients/patient-console/profile/in/PatientProfileTabs/TabPersonal';
import { useParams } from 'react-router-dom';
import { usePatientProfile } from 'src/modules/patients/patient-console/profile/out/PatientProfileActions';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

export default function PatientProfileContainer() {
  const { patientId } = useParams();
  const { getPatientForWeb } = usePatientProfile();
  const authContext = useContext(AuthContext);
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
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <ProfileTabs focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={9}>
        <TabPersonal />
      </Grid>
    </Grid>
  );
}
