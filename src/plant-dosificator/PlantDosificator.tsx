import React, { useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { theme } from './theme/theme';
import { PLANTAS } from './data/plantsData';
import type { ChildFormulaInput, DosageType, Plant, ResultRow } from './types/plant.types';
import PlantSearch from './components/PlantSearch';
import DosageTypeSelector from './components/DosageTypeSelector';
import CalculateButton from './components/CalculateButton';
import ResultSection from './components/ResultSection';
import { buildResultRows } from './utils/dosageCalculations';

const initialChildInput: ChildFormulaInput = { formula: null, value: null };

const PlantDosificator: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [dosageType, setDosageType] = useState<DosageType>('adultoPromedio');
  const [childInput, setChildInput] = useState<ChildFormulaInput>(initialChildInput);
  const [result, setResult] = useState<{ plant: Plant; rows: ResultRow[] } | null>(null);

  const handleSelectPlant = (plant: Plant | null) => {
    setSelectedPlant(plant);
    setResult(null);
  };

  const handleChangeDosageType = (value: DosageType) => {
    setDosageType(value);
    setChildInput(initialChildInput);
    setResult(null);
  };

  const handleChangeChildInput = (value: ChildFormulaInput) => {
    setChildInput(value);
    setResult(null);
  };

  const isChildDataMissing = dosageType === 'ninos' && (!childInput.formula || childInput.value === null || childInput.value <= 0);

  const canCalculate = Boolean(selectedPlant) && !isChildDataMissing;

  const disabledReason = useMemo(() => {
    if (!selectedPlant) return 'Busca y selecciona una planta medicinal para continuar.';
    if (isChildDataMissing) return 'Selecciona una fórmula pediátrica e ingresa el dato solicitado.';
    return undefined;
  }, [selectedPlant, isChildDataMissing]);

  const handleCalculate = () => {
    if (!selectedPlant) return;
    const rows = buildResultRows({ plant: selectedPlant, dosageType, childInput });
    setResult({ plant: selectedPlant, rows });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 3, md: 6 } }}>
        <Container maxWidth="md">
          <Stack spacing={1} sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1">
              Dosificador de plantas medicinales
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Consulta la dosificación tradicional recomendada para adultos, niños y adultos mayores, según fuentes de fitoterapia (OMS,
              ESCOP, Comisión E) y uso tradicional en Latinoamérica y Perú.
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <PlantSearch plantas={PLANTAS} selectedPlant={selectedPlant} onSelectPlant={handleSelectPlant} />

            <DosageTypeSelector
              dosageType={dosageType}
              onChangeDosageType={handleChangeDosageType}
              childInput={childInput}
              onChangeChildInput={handleChangeChildInput}
            />

            <CalculateButton disabled={!canCalculate} disabledReason={disabledReason} onCalculate={handleCalculate} />

            {result && (
              <>
                <Divider />
                <ResultSection plant={result.plant} rows={result.rows} dosageType={dosageType} childFormula={childInput.formula} />
              </>
            )}
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 6, display: 'block', textAlign: 'center' }}>
            Esta información es de carácter educativo y tradicional. No reemplaza la consulta con un profesional de la salud.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PlantDosificator;
