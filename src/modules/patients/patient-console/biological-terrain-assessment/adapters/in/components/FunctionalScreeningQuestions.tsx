import React from 'react';
import {
  Paper,
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
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FunctionalScreeningScore } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessment';
import {
  setFunctionalScreeningNote,
  setFunctionalScreeningScore,
} from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/slicers/BiologicalterrainAssessmentSlice';
import { ReduxStates } from 'src/shared/types/types';
import FunctionalScreeningQuestionItem from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/components/FunctionalScreeningQuestionItem';

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
              <TableCell sx={{ width: 600 }}>Puntaje</TableCell>
              <TableCell sx={{ width: 260 }}>Nota (opcional)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={question.uuid}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>
                  <FunctionalScreeningQuestionItem question={question} />
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
