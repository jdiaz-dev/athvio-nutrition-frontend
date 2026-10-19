import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

const INTERPRETATION_RANGES = [
  { semaphore: '🟢 VERDE', min: 0, max: 20, meaning: 'Terreno relativamente equilibrado.' },
  { semaphore: '🟡 AMARILLO', min: 21, max: 50, meaning: 'Terreno en compensación o desgaste funcional.' },
  { semaphore: '🔴 ROJO', min: 51, max: 120, meaning: 'Terreno alterado con múltiples señales funcionales.' },
] as const;

export function Interpreation() {
  const totalScore = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data?.totalScore ?? 0);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Interpretación del terreno
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Semáforo</TableCell>
              <TableCell>Rango</TableCell>
              <TableCell>Significado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {INTERPRETATION_RANGES.map((range) => {
              const isActive = totalScore >= range.min && totalScore <= range.max;
              return (
                <TableRow key={range.semaphore} selected={isActive}>
                  <TableCell sx={{ fontWeight: isActive ? 600 : 400 }}>{range.semaphore}</TableCell>
                  <TableCell sx={{ fontWeight: isActive ? 600 : 400 }}>
                    {range.min} – {range.max}
                  </TableCell>
                  <TableCell sx={{ fontWeight: isActive ? 600 : 400 }}>{range.meaning}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Interpreation;
