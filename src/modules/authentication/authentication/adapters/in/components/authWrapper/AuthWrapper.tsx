import { ReactNode } from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

// project import
import AuthFooter from './AuthFooter';
import Logo from 'src/shared/components/logo';
import AuthCard from './AuthCard';

// assets
import AuthBackground from './AuthBackground';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: Props) => (
  <Box sx={{ minHeight: '100vh' }}>
    <AuthBackground />

    <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
      {/* Fila principal: funcionalidades (izquierda) + login (derecha) */}
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: '100vh',
        }}
      >
        {/* Derecha: Logo + tarjeta de login/registro */}
        <Grid item xs={12} md={7} lg={7.5}>
          <Grid item xs={12} sx={{ ml: { xs: 2, md: 3 }, mt: { xs: 2, md: 3 } }}>
            <Logo />
          </Grid>

          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
            >
              <Grid item sx={{ px: { xs: 2, md: 0 } }}>
                <Typography variant="h3" sx={{ textAlign: { xs: 'left', md: 'center' }, mb: 1 }}>
                  Software de nutrición
                </Typography>
                <AuthCard>{children}</AuthCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

export default AuthWrapper;
