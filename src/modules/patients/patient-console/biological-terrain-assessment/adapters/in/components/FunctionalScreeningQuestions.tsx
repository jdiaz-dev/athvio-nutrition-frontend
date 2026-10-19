import React from 'react';
import {
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
// Adjust to wherever your app's typed Redux hooks live.
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FunctionalScreeningScore } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessment';
import {
  setFunctionalScreeningNote,
  setFunctionalScreeningScore,
} from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/slicers/BiologicalterrainAssessmentSlice';
import { ReduxStates } from 'src/shared/types/types';

const SCORE_OPTIONS: { value: FunctionalScreeningScore; label: string }[] = [
  { value: FunctionalScreeningScore.GOOD, label: '🟢 Buena función' },
  { value: FunctionalScreeningScore.MODERATE, label: '🟡 Alteración moderada' },
  { value: FunctionalScreeningScore.SEVERE, label: '🔴 Alteración importante' },
];

/**
 * "III. RASTREO FUNCIONAL DEL TERRENO"
 *
 * Self-contained: reads/writes `functionalScreeningQuestions` from the Redux
 * slice. Nota is optional (never required to submit a score). The TOTAL row
 * reflects `totalScore`, which the slice recomputes whenever a score
 * changes — this component never sums the column itself.
 */
export function FunctionalScreeningQuestions() {
  const dispatch = useDispatch();
  const questions = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data?.functionalScreeningQuestions ?? []);
  const totalScore = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data?.totalScore ?? 0);

  const handleScoreChange = (id: string, event: SelectChangeEvent<number | string>) => {
    const { value } = event.target;
    if (value === '') return;
    dispatch(setFunctionalScreeningScore({ id, score: Number(value) as FunctionalScreeningScore }));
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Rastreo funcional del terreno
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 48 }}>N°</TableCell>
              <TableCell>Pregunta</TableCell>
              <TableCell sx={{ width: 220 }}>Puntaje</TableCell>
              <TableCell sx={{ width: 260 }}>Nota (opcional)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={question.uuid}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>
                  <Select
                    fullWidth
                    size="small"
                    displayEmpty
                    value={question.score ?? ''}
                    onChange={(event) => handleScoreChange(question.uuid, event)}
                  >
                    <MenuItem value="">
                      <em>Sin responder</em>
                    </MenuItem>
                    {SCORE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Opcional"
                    value={question.note ?? ''}
                    onChange={(event) => dispatch(setFunctionalScreeningNote({ id: question.uuid, note: event.target.value }))}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} align="right">
                <Typography fontWeight={600}>TOTAL</Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography fontWeight={600}>{totalScore}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FunctionalScreeningQuestions;
