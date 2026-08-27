import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CHILD_FORMULAS } from '../data/childFormulas';
import type { ChildFormulaInput, ChildFormulaType } from '../types/plant.types';

interface ChildrenFormulaTableProps {
  childInput: ChildFormulaInput;
  onChangeChildInput: (value: ChildFormulaInput) => void;
}

/**
 * Table to pick exactly ONE pediatric formula (Fried / Young / Clark) and
 * enter the required datum (age in months, age in years, or weight in
 * kilos) for that formula. Only the selected row's input is enabled.
 */
const ChildrenFormulaTable: React.FC<ChildrenFormulaTableProps> = ({
  childInput,
  onChangeChildInput,
}) => {
  const handleSelectFormula = (formula: ChildFormulaType) => {
    onChangeChildInput({ formula, value: null });
  };

  const handleChangeValue = (formula: ChildFormulaType, rawValue: string) => {
    const numeric = rawValue === '' ? null : Number(rawValue);
    onChangeChildInput({ formula, value: numeric !== null && !Number.isNaN(numeric) ? numeric : null });
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="Tabla de fórmulas de dosificación pediátrica">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>Fórmula</TableCell>
            <TableCell>Para quién es</TableCell>
            <TableCell>Dato necesario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {CHILD_FORMULAS.map((formula) => {
            const isSelected = childInput.formula === formula.id;
            return (
              <TableRow
                key={formula.id}
                hover
                selected={isSelected}
                onClick={() => handleSelectFormula(formula.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell padding="checkbox">
                  <Radio
                    checked={isSelected}
                    onChange={() => handleSelectFormula(formula.id)}
                    value={formula.id}
                  />
                </TableCell>
                <TableCell>{formula.nombre}</TableCell>
                <TableCell>{formula.paraQuien}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    disabled={!isSelected}
                    placeholder={formula.placeholder}
                    label={`${formula.datoLabel} (${formula.datoUnidad})`}
                    value={isSelected && childInput.value !== null ? childInput.value : ''}
                    onChange={(event) => handleChangeValue(formula.id, event.target.value)}
                    onClick={(event) => event.stopPropagation()}
                    inputProps={{ min: 0, step: 'any' }}
                    sx={{ minWidth: 170 }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 1, display: 'block' }}>
        Selecciona una sola fórmula e ingresa el dato solicitado.
      </Typography>
    </TableContainer>
  );
};

export default ChildrenFormulaTable;
