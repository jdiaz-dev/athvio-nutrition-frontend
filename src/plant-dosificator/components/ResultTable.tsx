import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import type { ChildFormulaType, DosageType, ResultRow } from '../types/plant.types';
import { formatDose } from '../utils/dosageCalculations';

interface ResultTableProps {
  rows: ResultRow[];
  dosageType: DosageType;
  childFormula: ChildFormulaType | null;
}

const formulaDisplay: Record<ChildFormulaType, string> = {
  fried: 'Fried',
  young: 'Young',
  clark: 'Clark',
};

/**
 * Result section, part A: table of preparation × dosage.
 * The secondary column (adulto mayor / niños) is only rendered when the
 * corresponding population was selected, and its column is visually
 * highlighted.
 */
const ResultTable: React.FC<ResultTableProps> = ({ rows, dosageType, childFormula }) => {
  const showSecondary = dosageType !== 'adultoPromedio';

  const secondaryHeader =
    dosageType === 'adultoMayor'
      ? 'Dosificación adulto mayor'
      : `Dosificación niños${childFormula ? ` (${formulaDisplay[childFormula]})` : ''}`;

  const highlightAdulto = dosageType === 'adultoPromedio';

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="Tabla de resultados de dosificación">
        <TableHead>
          <TableRow>
            <TableCell>Nombre de la preparación</TableCell>
            <TableCell
              sx={{
                bgcolor: highlightAdulto ? 'secondary.light' : undefined,
                color: highlightAdulto ? 'secondary.contrastText' : undefined,
              }}
            >
              Dosificación adulto promedio
            </TableCell>
            {showSecondary && (
              <TableCell
                sx={{
                  bgcolor: 'secondary.light',
                  color: 'secondary.contrastText',
                }}
              >
                {secondaryHeader}
              </TableCell>
            )}
            <TableCell>Frecuencia al día</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const noAplica = !row.aplica;
            const frecuencia = row.secundaria?.frecuencyDay ?? row.adultoPromedio?.frecuencyDay;
            return (
              <TableRow key={row.key} sx={{ opacity: noAplica ? 0.5 : 1 }}>
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: highlightAdulto ? 'secondary.light' : undefined,
                    color: highlightAdulto ? 'secondary.contrastText' : undefined,
                    fontWeight: highlightAdulto ? 700 : 400,
                  }}
                >
                  {formatDose(row.adultoPromedio)}
                </TableCell>
                {showSecondary && (
                  <TableCell
                    sx={{
                      bgcolor: 'secondary.light',
                      color: 'secondary.contrastText',
                      fontWeight: 700,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {formatDose(row.secundaria)}
                      {(row.secundaria?.note || row.secundaria?.waterNote) && (
                        <Tooltip
                          title={
                            <>
                              {row.secundaria?.note && <div>{row.secundaria.note}</div>}
                              {row.secundaria?.waterNote && <div>{row.secundaria.waterNote}</div>}
                            </>
                          }
                        >
                          <InfoOutlinedIcon fontSize="inherit" />
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                )}
                <TableCell>{noAplica ? 'No aplica' : frecuencia}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {dosageType === 'adultoMayor' && (
        <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 1, display: 'block' }}>
          La dosificación de adulto mayor muestra la dosis mínima del adulto promedio, con fines
          comparativos.
        </Typography>
      )}
    </TableContainer>
  );
};

export default ResultTable;
