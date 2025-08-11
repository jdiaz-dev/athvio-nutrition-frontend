import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import {
  CalendarMonthOutlined,
  RestaurantMenuOutlined,
  GroupsOutlined,
  HealingOutlined,
  InsightsOutlined,
  PhoneIphoneOutlined,
  ChatOutlined,
} from '@mui/icons-material';

type Feature = { key: string; title: string; desc: string; icon: JSX.Element };

const features: Feature[] = [
  {
    key: 'patients',
    title: 'Gestión de pacientes',
    desc: 'Historial clínico, historial alimenticio, notas y adjuntos centralizados.',
    icon: <GroupsOutlined />,
  },
  {
    key: 'plans',
    title: 'Plantillas nutricionales',
    desc: 'Crea, duplica y personaliza la plantilla de tus planes por objetivo.',
    icon: <RestaurantMenuOutlined />,
  },
  {
    key: 'calendar',
    title: 'Calendario de seguimiento',
    desc: 'Asigna planes y realiza seguimientos en un calendario visual.',
    icon: <CalendarMonthOutlined />,
  },
  {
    key: 'diseases',
    title: 'Recetas',
    desc: 'Crea, duplica y personaliza tus propias recetas.',
    icon: <HealingOutlined />,
  },

  {
    key: 'insights',
    title: 'Recomendaciones inteligentes',
    desc: 'Sugerencias basadas según la enfermedad del paciente.',
    icon: <InsightsOutlined />,
  },
  { key: 'mobile', title: 'App del paciente', desc: 'Recetas, recordatorios y registro de adherencia.', icon: <PhoneIphoneOutlined /> },
  {
    key: 'chat',
    title: 'Chat en tiempo real',
    desc: 'Mensajería segura con pacientes, notificaciones y adjuntos.',
    icon: <ChatOutlined />,
    badge: 'Nuevo',
  },
];

export default function SoftwareFeatures() {
  return (
    <Box sx={{ px: { xs: 2, md: 3 }, pt: { xs: 1.5, md: 3 }, top: { md: 16 } }}>
      <Typography variant="h5" sx={{ color: 'text.secondary', mb: 1.5 }}>
        Funcionalidades
      </Typography>

      <Grid container spacing={1.25}>
        {features.map((f) => (
          <Grid key={f.key} item xs={12} sm={6} md={12}>
            <Card
              elevation={0}
              sx={{
                'bgcolor': (t) => (t.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'),
                'border': '1px solid',
                'borderColor': 'divider',
                'borderRadius': 2,
                'transition': 'all .2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: (t) => (t.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,.35)' : '0 8px 24px rgba(0,0,0,.1)'),
                },
              }}
            >
              <CardContent sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', p: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ lineHeight: 1.2, mb: 0.25 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.desc}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
