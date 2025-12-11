import React, { useContext } from 'react';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { PlanificationBody } from 'src/modules/patients/patient-console/planifications/helpers/planifications';
import { Modules } from 'src/shared/Consts';

type MacroBarProps = {
  advancePercentageMacro: number;
  targetMacro: number;
  accumulated: number;
  unit: string;
  subtitle: string;
  color: 'primary' | 'info' | 'warning' | 'secondary' | 'success' | string;
};

function NutrientBar({ advancePercentageMacro, targetMacro, accumulated, unit, subtitle, color }: MacroBarProps) {
  const { currentModule } = useContext(CurrentModuleContext);
  const applyMeasurement = currentModule === Modules.CLIENT_PLANS;
  const targetFormat = applyMeasurement ? `${accumulated.toFixed(1)} / ${targetMacro} ${unit}` : `${accumulated.toFixed(1)} ${unit}`;

  return (
    <Box sx={{ mb: 1.5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" fontWeight={500}>
          {subtitle}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {targetFormat}
        </Typography>
      </Stack>
      <LinearProgress
        color={color as 'primary' | 'info' | 'warning' | 'secondary' | 'success'}
        variant="determinate"
        value={Math.min(100, applyMeasurement ? advancePercentageMacro : 100)}
        sx={{ mt: 0.75, height: 8, borderRadius: 8 }}
      />
    </Box>
  );
}

function MacroMeasurement(macros: { protein: number; carbs: number; fat: number; calories: number }) {
  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification) as PlanificationBody;

  const macrosConfig = [
    {
      key: 'calories' as const,
      target: planificationState.configuredMacros.planCalories,
      accumulated: macros.calories,
      unit: 'cal',
      subtitleSuffix: 'Calorías',
      color: 'secondary',
    },
    {
      key: 'protein' as const,
      target: planificationState.configuredMacros.totalProtein,
      accumulated: macros.protein,
      unit: 'g',
      subtitleSuffix: 'Proteína',
      color: 'primary',
    },
    {
      key: 'carbs' as const,
      target: planificationState.configuredMacros.totalCarbs,
      accumulated: macros.carbs,
      unit: 'g',
      subtitleSuffix: 'Carbohidratos',
      color: 'info',
    },
    {
      key: 'fat' as const,
      target: planificationState.configuredMacros.totalFat,
      accumulated: macros.fat,
      unit: 'g',
      subtitleSuffix: 'Grasas',
      color: 'warning',
    },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      {macrosConfig.map(({ key, target, accumulated, unit, subtitleSuffix, color }) => {
        const advancePercentageMacro = target ? (accumulated * 100) / target : 0;

        return (
          <NutrientBar
            key={key}
            advancePercentageMacro={advancePercentageMacro}
            targetMacro={target}
            accumulated={accumulated}
            unit={unit}
            subtitle={subtitleSuffix}
            color={color}
          />
        );
      })}
    </Box>
  );
}

export default MacroMeasurement;
