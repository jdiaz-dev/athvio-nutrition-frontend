import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Stack, Divider, CircularProgress, useTheme } from '@mui/material';
import { useInternalFoods } from 'src/modules/nutrition/internal-foods/adapters/out/InternalFoodActions';
import { InternalFood } from 'src/modules/nutrition/internal-foods/types/nutrient';
import { Nutrient, NutrientDetails } from 'src/shared/components/MealBuilder/food.types';
import MacroMeasurement from 'src/shared/components/PlanDetailDialog/MacroMeasurement';

type NutrientDailyAnalysisProps = {
  internalFoods: InternalFood[];
};

const clamp = (value: number, min = 0, max = 200) => Math.min(max, Math.max(min, value));

const NutrientCalculator = ({ internalFoods }: NutrientDailyAnalysisProps) => {
  const theme = useTheme();
  const { calculateNutrients } = useInternalFoods();
  const [nutrients, setNutrients] = useState<NutrientDetails | null>(null);
  const { PROCNT, ENERC_KCAL, FAT, CHOCDF, ...restNutrients } = nutrients ?? {};

  useEffect(() => {
    const fetchNutrients = async () => {
      try {
        const result = await calculateNutrients({ internalFoods });
        if (result.data) setNutrients(result.data.calculateFoodsNutrients);
      } catch (error) {}
    };
    if (internalFoods.length > 0) void fetchNutrients();
  }, [internalFoods]);

  const micronutrientCodes = Object.keys(restNutrients);

  const getNutrient = (code: string): Nutrient | null =>
    (restNutrients?.[code as keyof typeof restNutrients] as Nutrient | null | undefined) ?? null;

  return (
    <Card sx={{ marginLeft: 1 }}>
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Análisis global
        </Typography>

        <MacroMeasurement
          protein={PROCNT?.quantity ?? 0}
          carbs={CHOCDF?.quantity ?? 0}
          fat={FAT?.quantity ?? 0}
          calories={ENERC_KCAL?.quantity ?? 0}
        />

        <Divider sx={{ my: 3 }} />

        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: 0,
              borderLeft: `2px dashed ${theme.palette.divider}`,
              pointerEvents: 'none',
            }}
          />

          <Stack spacing={1.25}>
            {micronutrientCodes.map((code) => {
              const nutrient = getNutrient(code);

              if (!nutrient) return null;

              const current = nutrient.quantity;
              const percent = 100;

              return (
                <Box
                  key={code}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '0.5fr 1fr',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: theme.palette.action.hover,
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.75,
                  }}
                >
                  <Typography variant="body2">{nutrient.spanishLabel || nutrient.label || code}</Typography>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption" fontWeight={600} width={'100%'} textAlign={'end'}>
                        {current.toFixed(1)} {nutrient.unit}
                      </Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={percent} sx={{ height: 6, borderRadius: 6 }} />
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
export default NutrientCalculator;
