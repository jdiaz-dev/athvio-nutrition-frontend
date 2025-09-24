// src/core/components/LandingPage.tsx
import React from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Card, CardContent, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import RestaurantMenuOutlined from '@mui/icons-material/RestaurantMenuOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
import InsightsOutlined from '@mui/icons-material/InsightsOutlined';
import PhoneIphoneOutlined from '@mui/icons-material/PhoneIphoneOutlined';
import ChatOutlined from '@mui/icons-material/ChatOutlined';
import ShieldOutlined from '@mui/icons-material/ShieldOutlined';

const features = [
  {
    icon: <GroupsOutlined />,
    title: 'Gestión de pacientes',
    desc: 'Historial clínico y alimenticio, notas y adjuntos centralizados.',
  },
  {
    icon: <RestaurantMenuOutlined />,
    title: 'Planes nutricionales',
    desc: 'Crea, duplica y personaliza tu plan nutricional por objetivo.',
  },
  { icon: <CalendarMonthOutlined />, title: 'Seguimiento a el paciente', desc: 'Asigna tus planes y realiza seguimiento visual.' },
  { icon: <MenuBookOutlined />, title: 'Recetas', desc: 'Crea, duplica y personaliza tus propias recetas.' },
  { icon: <InsightsOutlined />, title: 'Recomendaciones inteligentes', desc: 'Sugerencias según la enfermedad del paciente.' },
  { icon: <PhoneIphoneOutlined />, title: 'App del paciente', desc: 'Recibe sus planes asignados por fecha.' },
  { icon: <ChatOutlined />, title: 'Chat en tiempo real', desc: 'Mensajería segura, notificaciones y adjuntos.' },
  { icon: <ShieldOutlined />, title: 'Seguridad & privacidad', desc: 'Cifrado de datos en tránsito.' },
];

function FeatureCard({ icon, title, desc, badge }: { icon: React.ReactNode; title: string; desc: string; badge?: string }) {
  return (
    <Card
      variant="outlined"
      sx={(t) => ({
        'borderRadius': 2,
        'borderColor': badge ? t.palette.primary.main : 'divider',
        'bgcolor': t.palette.mode === 'dark' ? alpha('#fff', 0.04) : alpha('#000', 0.03),
        'transition': 'all .2s ease',
        '&:hover': { borderColor: 'primary.main', boxShadow: t.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,.35)' : t.shadows[6] },
      })}
    >
      <CardContent sx={{ p: 2.25 }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box
            sx={(t) => ({
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha(t.palette.primary.main, 0.14),
              color: t.palette.primary.main,
              border: '1px solid',
              borderColor: alpha(t.palette.primary.main, 0.4),
              flexShrink: 0,
            })}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Typography variant="subtitle1" sx={{ lineHeight: 1.2 }}>
                {title}
              </Typography>
              {badge && <Chip size="small" label={badge} color="primary" sx={{ height: 20, fontSize: 11, borderRadius: 1 }} />}
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {desc}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function Functionalities() {
  return (
    <Box sx={{ pt: 4, pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          Funcionalidades
        </Typography>

        <Grid container spacing={2.5}>
          {features.map((f) => (
            <Grid key={f.title} item xs={12} sm={6} md={4}>
              <FeatureCard icon={f.icon} title={f.title} desc={f.desc} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Functionalities;
