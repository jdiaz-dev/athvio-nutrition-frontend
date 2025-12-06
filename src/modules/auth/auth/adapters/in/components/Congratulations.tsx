import React from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

const APP_DOWNLOAD_URL = process.env.REACT_APP_PATIENT_APP_DOWNLOAD_URL;
// Ejemplo de valor: https://tu-bucket.s3.amazonaws.com/app/athvio-paciente.apk

export default function Congratulations() {
  const theme = useTheme();

  const handleDownload = () => {
    if (APP_DOWNLOAD_URL) {
      window.open(APP_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
    } else {
      // fallback simple (por si aún no configuras la env var)
      console.warn('APP_DOWNLOAD_URL is not defined');
    }
  };

  const handleGoToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 420,
          borderRadius: 4,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            bgcolor: theme.palette.primary.main + '22',
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 40,
              color: theme.palette.primary.main,
            }}
          />
        </Box>

        <Typography variant="h5" fontWeight={700} gutterBottom>
          ¡Felicitaciones!
        </Typography>

        <Typography variant="body2" color="text.primary" mb={3}>
          Tu cuenta ha sido activada correctamente.
          <br />
          Ahora puedes descargar la app del paciente y ver tu plan nutricional.
        </Typography>

        <Stack spacing={1.5}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ borderRadius: 999, fontWeight: 600 }}
            onClick={handleDownload}
          >
            Descargar app del paciente
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
