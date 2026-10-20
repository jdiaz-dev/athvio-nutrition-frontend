import React from 'react';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setFunctionalScreeningNote } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/slicers/BiologicalterrainAssessmentSlice';
import { ReduxStates } from 'src/shared/types/types';
import FunctionalScreeningQuestionItem from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/components/FunctionalScreeningQuestionItem';

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  'width': '100%',
  'fontFamily': theme.typography.fontFamily,
  'fontSize': '1rem',
  'color': theme.palette.text.primary,
  'backgroundColor': theme.palette.background.paper,
  'borderRadius': theme.shape.borderRadius,
  'border': `1px solid ${theme.palette.grey[400]}`,
  'boxSizing': 'border-box',
  'resize': 'vertical',

  '&:hover': {
    borderColor: theme.palette.text.primary,
  },

  '&:focus': {
    outline: 0,
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
  },

  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
}));

export function FunctionalScreeningQuestions() {
  const dispatch = useDispatch();
  const questions = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data?.functionalScreeningQuestions ?? []);
  const totalScore = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data?.totalScore ?? 0);

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
              <TableCell sx={{ width: 600 }}>
                Puntaje
                <br/> 
                🟢 Buena función (0)  🟡 Alteración moderada (1)  🔴 Alteración importante (2)</TableCell>
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
                  <StyledTextarea
                    minRows={2}
                    placeholder="Opcional"
                    value={question.note ?? ''}
                    onChange={(event) =>
                      dispatch(
                        setFunctionalScreeningNote({
                          id: question.uuid,
                          note: event.target.value,
                        }),
                      )
                    }
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
