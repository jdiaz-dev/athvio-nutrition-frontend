import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import AuthWrapper from '../authWrapper/AuthWrapper';
import SignInForm from './SignInForm';
import SignUpOrSignInWithGoogle from 'src/modules/auth/auth/adapters/in/components/SignUpOrSignInWithGoogle';
import { AuthFormMode } from 'src/modules/auth/auth/adapters/in/shared/enum';
import { useEffect } from 'react';
import { usePayments } from 'src/modules/professionals/payments/out/AssignProgramActions';
import { openSnackbar } from 'src/shared/components/Snackbar/snackbar';
import { SnackbarProps } from 'src/shared/types/snackbar';

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const { verifyPayment } = usePayments();
  useEffect(() => {
    const verifyPaymentHelper = async () => {
      const { data } = await verifyPayment({ externalId: searchParams.get('checkout_id')! });
      if (data?.verifyPayment.isSucceded) {
        openSnackbar({
          open: true,
          message: 'Gracias por tu compra, tu subscripción fue exitosa.',
          variant: 'alert',
          alert: {
            color: 'success',
          },
        } as SnackbarProps);
      } else {
        openSnackbar({
          open: true,
          message: 'Hubo un error con tu subscripción.',
          variant: 'alert',
          alert: {
            color: 'error',
          },
        } as SnackbarProps);
      }
    };

    if (searchParams.get('checkout_id')) {
      verifyPaymentHelper();
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get('isWithCommodin')) {
      openSnackbar({
        open: true,
        message: 'Registro exitoso, por favor inicie sesión.',
        variant: 'alert',
        alert: {
          color: 'success',
        },
      } as SnackbarProps);
    }
  }, [searchParams]);

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
