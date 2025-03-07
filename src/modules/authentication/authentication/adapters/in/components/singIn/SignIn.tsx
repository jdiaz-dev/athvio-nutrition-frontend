import { Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import AuthWrapper from '../authWrapper/AuthWrapper';
import SignInForm from './SignInForm';

const SignIn = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">SignIn</Typography>
            <Typography component={Link} to={'/signup'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <SignInForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default SignIn;
