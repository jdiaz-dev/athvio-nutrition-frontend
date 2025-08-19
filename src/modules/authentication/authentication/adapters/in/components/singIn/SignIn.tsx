import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import AuthWrapper from '../authWrapper/AuthWrapper';
import SignInForm from './SignInForm';
import SignUpOrSignInWithGoogle from 'src/modules/authentication/authentication/adapters/in/components/SignUpOrSignInWithGoogle';
import { AuthFormMode } from 'src/modules/authentication/authentication/adapters/in/shared/enum';

const SignIn = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Iniciar sesión</Typography>
            <Typography component={Link} to={'/signup'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              ¿No tienes una cuenta?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <SignUpOrSignInWithGoogle authFormMode={AuthFormMode.SIGN_IN} />
        </Grid>
        <Grid item xs={12}>
          <Divider textAlign="center" sx={{ my: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
              o
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <SignInForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default SignIn;
