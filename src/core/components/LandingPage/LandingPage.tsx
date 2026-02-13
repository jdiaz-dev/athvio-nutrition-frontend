import React, { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { alpha } from '@mui/material/styles';
import { AppBar, Box, Button, Card, CardContent, Chip, Container, Divider, Link as MLink, Stack, Toolbar, Typography } from '@mui/material';

import Logo from 'src/shared/components/logo';
import { LANDING_SCREEN } from 'src/shared/graphql-queries/WorkflowStreamAuditQueries';
import Functionalities from 'src/core/components/LandingPage/Functionalities';

export default function LandingPage() {
  const [fire] = useMutation(LANDING_SCREEN);
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    fire();
  }, [fire]);

  const featuresRef = useRef<HTMLDivElement | null>(null);

  const scrollToFeatures = (e?: React.MouseEvent) => {
    e?.preventDefault();
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pricingRef = useRef<HTMLDivElement | null>(null);

  const scrollToPricing = (e?: React.MouseEvent) => {
    e?.preventDefault();
    pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: (t) => (t.palette.mode === 'dark' ? '#131516' : '#f7f7f7'), position: 'relative' }}>
      {/* ===== Top Nav (like screenshot) ===== */}
      <AppBar
        elevation={0}
        color="transparent"
        position="sticky"
        sx={{
          backdropFilter: 'saturate(180%) blur(8px)',
          borderBottom: (t) => `1px solid ${alpha(t.palette.divider, 0.4)}`,
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <Logo />
            </Box>

            <Box sx={{ flex: 1 }} />

            <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MLink href="#caracteristicas" underline="none" color="text.primary" onClick={scrollToFeatures}>
                Características
              </MLink>
              <MLink href="#precios" underline="none" color="text.primary" onClick={scrollToPricing}>
                Precios
              </MLink>
              {/* <MLink href="#faq" underline="none" color="text.primary">
                Preguntas frecuentes
              </MLink> */}
              <MLink href="/signin" underline="none" color="text.primary">
                Iniciar sesión
              </MLink>
            </Stack>

            <Button
              href="/signup"
              size="medium"
              variant="contained"
              sx={{
                ml: { xs: 0, md: 2 },
                borderRadius: 999,
                px: 2.5,
              }}
            >
              Comenzar gratis ahora
            </Button>
          </Container>
        </Toolbar>
      </AppBar>

      {/* ===== Hero ===== */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 10 },
        }}
      >
        {/* Top-right purple shape (decor) */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            right: '-10%',
            top: '-20%',
            width: { xs: 420, md: 720 },
            height: { xs: 420, md: 720 },
            borderRadius: '50%',
            background: (t) =>
              `radial-gradient(closest-side, ${alpha(t.palette.primary.main, 0.9)}, ${alpha(
                t.palette.primary.main,
                0.35,
              )} 60%, transparent)`,
            filter: 'blur(24px)',
            transform: 'rotate(-8deg)',
          }}
        />

        {/* Subtle background blob left */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: '-20%',
            bottom: '-10%',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: (t) => `radial-gradient(closest-side, ${alpha(t.palette.primary.main, 0.25)}, transparent)`,
            filter: 'blur(28px)',
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Headline */}
          <Stack alignItems="center" spacing={3} sx={{ textAlign: 'center' }}>
            <Typography
              component="h1"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
                fontSize: { xs: 34, sm: 42, md: 54 },
                color: 'text.primary',
              }}
            >
              El software para{' '}
              <Box
                component="span"
                sx={(t) => ({
                  px: 1.25,
                  py: 0.5,
                  borderRadius: 1.5,
                  color: t.palette.getContrastText(t.palette.primary.main),
                  background: 'linear-gradient(135deg, #6a00ff 0%, #8a2be2 35%, #a855f7 70%, #c084fc 100%)',
                  boxShadow: '0 6px 18px rgba(138,43,226,0.35)',
                  display: 'inline-block',
                })}
              >
                nutricionistas naturópatas
              </Box>{' '}
              que te simplifica todo
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 920, lineHeight: 1.7, px: { xs: 2, md: 0 } }}>
              Elabora fácilmente planes alimenticios óptimos para cada paciente, mantén ordenados todos sus historiales y haz crecer
              exponencialmente tu negocio.
            </Typography>

            {/* Primary CTA */}
            <Button
              href="/signup"
              size="large"
              variant="contained"
              sx={{
                mt: 1,
                borderRadius: 999,
                px: 4,
                py: 1.5,
                fontSize: { xs: 16, md: 18 },
                boxShadow: (t) => `0 12px 28px ${alpha(t.palette.primary.main, 0.35)}`,
              }}
            >
              Comenzar gratis ahora
            </Button>

            {/* Product preview card at the bottom (placeholder area) */}
            {/* <Card
              elevation={0}
              sx={(t) => ({
                mt: { xs: 5, md: 7 },
                borderRadius: 2,
                border: `1px solid ${alpha(t.palette.divider, 0.6)}`,
                bgcolor: alpha(t.palette.background.paper, 0.6),
                backdropFilter: 'blur(8px)',
                width: '100%',
                maxWidth: 1040,
                mx: 'auto',
              })}
            >
              <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                <Box
                  sx={{
                    height: { xs: 180, sm: 260, md: 320 },
                    borderRadius: 1.5,
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: 'url(/assets/landing/preview.png)', // <-- put your PNG here
                  }}
                />
              </CardContent>
            </Card> */}
          </Stack>
        </Container>
      </Box>

      {/* ===== Section 2 (your existing component) ===== */}
      <Box
        id="caracteristicas"
        ref={featuresRef}
        sx={{
          scrollMarginTop: { xs: 90, md: 100 }, // so the sticky AppBar doesn’t cover the heading
        }}
      >
        <Functionalities />
      </Box>
      {/* ===== Section 3: Pricing ===== */}
      <Box
        id="precios"
        ref={pricingRef}
        sx={{
          bgcolor: 'background.default',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography component="h2" variant="h4" align="center" fontWeight={700} sx={{ mb: { xs: 6, md: 8 } }}>
            Precios del software
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
            {/* Annual plan */}
            {/* Annual plan */}
            <Card
              sx={{
                flex: 1,
                border: (t) => `2px solid ${t.palette.primary.light}`,
                borderRadius: 3,
                boxShadow: (t) => `0 8px 24px ${alpha(t.palette.primary.main, 0.1)}`,
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                {/* <Chip label="Más popular" color="primary" sx={{ mb: 2, fontWeight: 600 }} /> */}
                <Typography variant="h6" gutterBottom>
                  ANUAL
                </Typography>

                {/* Precio mensual */}
                <Typography variant="h3" color="primary" fontWeight={700}>
                  $25
                  <Typography component="span" variant="subtitle1" color="text.secondary">
                    /mes
                  </Typography>
                </Typography>

                {/* Precio total actual + antes */}
                <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 1 }}>
                  <Typography variant="body1" fontWeight={600}>
                    Total 299$
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through', alignSelf: 'flex-end' }}>
                    599$
                  </Typography>
                </Stack>

                {/* Beneficios */}
                <Typography sx={{ mt: 2 }}>
                  Acceso total al precio más bajo. <br />
                  Incluye una prueba gratuita de 7 días.
                </Typography>

                <Button href="/signup" variant="contained" size="large" sx={{ mt: 3, borderRadius: 999, px: 4 }}>
                  Iniciar una prueba gratuita
                </Button>
              </CardContent>
            </Card>

            {/* Monthly plan */}
            {/* <Card
              sx={{
                flex: 1,
                borderRadius: 3,
                border: (t) => `1px solid ${t.palette.divider}`,
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h6" gutterBottom>
                  MENSUAL
                </Typography>
                <Typography variant="h3" color="text.primary" fontWeight={700}>
                  $39
                  <Typography component="span" variant="subtitle1" color="text.secondary">
                    /mes
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through', mt: 0.5 }}>
                  79$
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Acceso total sin compromiso. Cancela en cualquier momento. <br />
                  Incluye una prueba gratuita de 7 días.
                </Typography>
                <Button href="/signup" variant="outlined" size="large" sx={{ mt: 3, borderRadius: 999, px: 4 }}>
                  Iniciar una prueba gratuita
                </Button>
              </CardContent>
            </Card> */}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

/** Small helper for the trust bullets */
function Bullet({ text }: { text: string }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
      <Typography variant="caption">{text}</Typography>
    </Stack>
  );
}
