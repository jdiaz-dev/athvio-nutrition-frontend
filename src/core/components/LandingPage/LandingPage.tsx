import React, { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { alpha } from '@mui/material/styles';
import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';

import Logo from 'src/shared/components/logo';
import { LANDING_SCREEN } from 'src/shared/graphql-queries/WorkflowStreamAuditQueries';
import Functionalities from 'src/core/components/LandingPage/Functionalities';

export default function LandingPage() {
  const [fire] = useMutation(LANDING_SCREEN);
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return; // avoid double execution in StrictMode
    calledRef.current = true;
    fire();
  }, [fire]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: (t) => (t.palette.mode === 'dark' ? '#131516' : '#f7f7f7'), position: 'relative' }}>
      {/* === SECTION 1: HERO (fills more space, keeps effects) === */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: '90vh', md: '100vh' }, // more presence
          display: 'flex',
          alignItems: 'center',
          pt: 0,
        }}
      >
        {/* Glow blobs behind everything (unchanged effects) */}
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '10%', md: '15%' },
              left: '6%',
              width: 320,
              height: 220,
              borderRadius: '50%',
              background: (t) => `radial-gradient(closest-side, ${t.palette.primary.main}33, transparent)`,
              filter: 'blur(28px)',
              animation: 'float1 10s ease-in-out infinite',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: '6%', md: '10%' },
              right: '10%',
              width: 360,
              height: 260,
              borderRadius: '50%',
              background: (t) => `radial-gradient(closest-side, ${t.palette.primary.main}22, transparent)`,
              filter: 'blur(32px)',
              animation: 'float2 12s ease-in-out infinite',
            }}
          />
          <style>
            {`@keyframes float1 { 0%,100%{ transform: translateY(-6px)} 50%{ transform: translateY(6px)} }
              @keyframes float2 { 0%,100%{ transform: translateY(5px)} 50%{ transform: translateY(-5px)} }`}
          </style>
        </Box>

        {/* Foreground hero content */}
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 4 } }}>
          <Stack alignItems="center" spacing={1.25} sx={{ textAlign: 'center', mb: 2 }}>
            {/* tiny glow behind logo */}
            <Box sx={{ position: 'relative', display: 'inline-grid', placeItems: 'center', mb: 1.5 }}>
              <Box
                sx={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: 6,
                  filter: 'blur(22px)',
                  background: (t) => `radial-gradient(120px 80px at 50% 40%, ${alpha(t.palette.primary.main, 0.25)}, transparent 70%)`,
                }}
              />
              <Logo />
            </Box>

            {/* Gradient title + animated underline (kept) */}
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: 30, md: 40, lg: 44 },
                background: (t) => `linear-gradient(90deg, ${t.palette.primary.main}, #8de3d6)`,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Software de nutrición
            </Typography>
            <Box
              sx={{
                width: 180,
                height: 4,
                borderRadius: 2,
                mx: 'auto',
                background: (t) => `linear-gradient(90deg, transparent, ${t.palette.primary.main}99, transparent)`,
                animation: 'shine 2.6s ease-in-out infinite',
              }}
            />
            <style>{`@keyframes shine { 0%,100%{opacity:.45} 50%{opacity:1} }`}</style>
          </Stack>

          {/* Wider, taller card to occupy more visual space */}
          <Card
            variant="outlined"
            sx={(t) => ({
              borderRadius: 2,
              borderColor: alpha(t.palette.primary.main, 0.15),
              bgcolor: alpha(t.palette.background.paper, 0.06),
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              maxWidth: { md: 1140, lg: 1320 }, // wider
              width: '100%',
              mx: 'auto',
            })}
          >
            <CardContent
              sx={{
                p: { xs: 3, md: 5, lg: 6 }, // more padding
                textAlign: 'center',
                minHeight: { md: 320, lg: 380 }, // taller
              }}
            >
              <Typography
                color="text.secondary"
                sx={{
                  maxWidth: { xs: 760, md: 980, lg: 1100 }, // wider paragraph
                  mx: 'auto',
                  mb: 2.5,
                  lineHeight: 1.8, // airy lines fill space nicely
                  fontSize: { xs: 16, md: 18 },
                }}
              >
                Crea planes en minutos, comunica a tus pacientes por chat y sigue su progreso con analíticas claras. Diseñado para dietistas
                y nutricionistas que buscan eficiencia.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" sx={{ my: 1.5, mt: 4 }}>
                <Button
                  size="large"
                  variant="contained"
                  href="/signup"
                  sx={{
                    'px': 4,
                    'transition': 'transform .12s ease, box-shadow .12s ease',
                    '&:hover': (t) => ({
                      transform: 'translateY(-1px)',
                      boxShadow: `0 10px 24px ${alpha(t.palette.primary.main, 0.35)}`,
                    }),
                  }}
                >
                  Probar Gratis
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  href="/signin"
                  sx={{
                    'px': 4,
                    'borderColor': 'primary.main',
                    '&:hover': { borderColor: 'primary.light', backgroundColor: 'action.hover' },
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Stack>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{ color: 'text.secondary', mt: 4 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                  <Typography variant="caption">Prueba gratis 7 días</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                  <Typography variant="caption">Sin tarjeta</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                  <Typography variant="caption">Seguridad y cifrado</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
      {/* === SECTION 2: FUNCIONALIDADES  === */}
      {/* not touch */}
      <Functionalities />
    </Box>
  );
}
