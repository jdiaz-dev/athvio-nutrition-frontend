import { Grid } from '@mui/material';

import AuthWrapper from '../authWrapper/AuthWrapper';
import SignUpProfessionalForm from './SignUpProfessionalForm';

const SingUpProfessional = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <SignUpProfessionalForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default SingUpProfessional;
