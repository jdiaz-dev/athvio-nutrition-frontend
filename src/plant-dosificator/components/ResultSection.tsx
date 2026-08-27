import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import type { ChildFormulaType, DosageType, Plant, ResultRow } from '../types/plant.types';
import ResultTable from './ResultTable';
import RecommendedTimeClock from './RecommendedTimeClock';

interface ResultSectionProps {
  plant: Plant;
  rows: ResultRow[];
  dosageType: DosageType;
  childFormula: ChildFormulaType | null;
}

/**
 * Section 4: Resultado.
 * Composed of two independent components as required: the dosage table
 * and the recommended-time circular clock.
 */
const ResultSection: React.FC<ResultSectionProps> = ({ plant, rows, dosageType, childFormula }) => {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <AssignmentTurnedInIcon color="primary" />
        <Typography variant="h6" component="h2">
          Resultado
        </Typography>
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Planta seleccionada: <strong>{plant.com}</strong>{' '}
        <Typography component="span" fontStyle="italic" color="text.secondary">
          ({plant.s})
        </Typography>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ResultTable rows={rows} dosageType={dosageType} childFormula={childFormula} />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecommendedTimeClock schedules={plant.recomendedSchedules} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultSection;
