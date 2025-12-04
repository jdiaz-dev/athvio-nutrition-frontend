import PersonalInformation from 'src/modules/patients/patient-console/profile/in/components/TabPersonal/PersonalInformation';
import BasicInformation from 'src/modules/patients/patient-console/profile/in/components/TabPersonal/BasicInformation';
import MainCard from 'src/shared/components/MainCard/MainCard';
import { Typography } from '@mui/material';
import { useRef } from 'react';
import SaveTabPersonalButton from 'src/modules/patients/patient-console/profile/in/components/TabPersonal/SaveTabPersonalButton';

export default function TabPersonal() {
  const form1Ref = useRef<any>();
  const form2Ref = useRef<any>();
  return (
    <>
      <MainCard
        content={false}
        title={<Typography variant="h5">Información del paciente</Typography>}
        sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem', textAlign: 'left' } }}
      >
        <PersonalInformation formRef={form1Ref} />
        <BasicInformation formRef={form2Ref} />
        <SaveTabPersonalButton form1Ref={form1Ref} form2Ref={form2Ref} />
      </MainCard>
    </>
  );
}
