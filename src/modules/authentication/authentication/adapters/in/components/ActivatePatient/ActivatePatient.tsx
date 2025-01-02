import { Grid, Stack, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ActivatePatientForm from 'src/modules/authentication/authentication/adapters/in/components/ActivatePatient/ActivatePatientForm';
import AuthWrapper from 'src/modules/authentication/authentication/adapters/in/components/authWrapper/AuthWrapper';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function ActivatePatient() {
  const { user } = useParams();
  const { isAuthenticated, signUpProfessionalHandler } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate replace to="/professional/patients" />;
  }
  return (
    <>
      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Activate your account</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {user && <ActivatePatientForm user={user} />}
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  );
}

export default ActivatePatient;
