import React, { useEffect, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { Box, Card, CardContent, Chip, CircularProgress, Typography } from '@mui/material';
import { useBodyMassIndex } from 'src/modules/nutrition/formulas/adapters/out/BodyMassIndexActions';
import { BodyMassIndexResult } from 'src/modules/nutrition/formulas/types/formula';

type ChipColor = 'success' | 'warning' | 'error' | 'info' | 'default';

const classificationColor = (classification: string): ChipColor => {
  const value = classification.toLowerCase();
  if (value.startsWith('normal')) return 'success';
  if (value.startsWith('sobrepeso')) return 'warning';
  if (value.startsWith('obesidad')) return 'error';
  if (value.startsWith('delgadez')) return 'info';
  return 'default';
};

const formatNumber = (value: number) => value.toLocaleString('es-PE', { maximumFractionDigits: 2 });

interface BodyMassIndexCardProps {
  age: number;
  height: number;
  weight: number;
  gender: string;
  isPregnant: boolean;
}

function BodyMassIndexCard({ age, height, weight, gender, isPregnant }: BodyMassIndexCardProps) {
  const { calculateBodyMassIndex } = useBodyMassIndex();
  const [result, setResult] = useState<BodyMassIndexResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isFemale = gender === 'female';
  const validInput = [age, height, weight].every((value) => Number.isFinite(value) && value > 0) && (gender === 'male' || isFemale);

  useEffect(() => {
    if (!validInput) {
      setResult(null);
      setError(null);
      return;
    }
    let cancelled = false;
    // small debounce so the backend is not called on every keystroke
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await calculateBodyMassIndex({
          age,
          height,
          weight,
          gender,
          ...(isFemale && isPregnant ? { isPregnant: true } : {}),
        });
        if (!cancelled) {
          setResult(response);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setResult(null);
          setError((e as ApolloError).graphQLErrors?.[0]?.message ?? 'No se pudo calcular el IMC');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [age, height, weight, gender, isPregnant, validInput]);

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={600}>
            Índice de masa corporal (IMC)
          </Typography>
          {loading && <CircularProgress size={18} />}
        </Box>

        {!validInput && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Ingresa peso, estatura, edad y género para calcular el IMC.
          </Typography>
        )}

        {validInput && error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {validInput && !error && result && (
          <Box sx={{ mt: 1 }}>
            <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
              <Typography variant="h5" fontWeight={700}>
                {formatNumber(result.bodyMassIndex)}
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  kg/m²
                </Typography>
              </Typography>
              <Chip label={result.classification} color={classificationColor(result.classification)} size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {result.zScore !== null ? `Puntaje Z: ${formatNumber(result.zScore)} · ` : ''}
              Rango: {result.rangeLabel}
            </Typography>
            {result.weightGainMinKg !== null && result.weightGainMaxKg !== null && (
              <Typography variant="body2" color="text.secondary">
                Ganancia de peso recomendada: {formatNumber(result.weightGainMinKg)} – {formatNumber(result.weightGainMaxKg)} kg
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              Fuente: {result.source}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default BodyMassIndexCard;
