import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AuthWrapper from '../authWrapper/AuthWrapper';
import SignUpProfessionalForm from './SignUpProfessionalForm';

const SingUpProfessional = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Registrate</Typography>
            <Typography component={Link} to={'/signin'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              ¿Ya tienes una cuenta?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <SignUpProfessionalForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default SingUpProfessional;
