import React, { useContext } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useMealsStates } from 'src/shared/components/PlanDetailDialog/useMealsStates';
import { PlanificationBody } from 'src/modules/patients/patient-console/planifications/helpers/planifications';
import { Modules } from 'src/shared/Consts';

type MacroKey = 'protein' | 'carbs' | 'fat' | 'calories';

type MacroBarProps = {
  percentage: number;
  accumulated: number;
  unit: string;
  subtitle: string;
};

function MacroBar({ percentage, accumulated, unit, subtitle }: MacroBarProps) {
  const { currentModule } = useContext(CurrentModuleContext);
  const applyAnalysis = currentModule === Modules.CLIENT_PLANS;

  return (
    <Box sx={{ position: 'relative', width: '23%' }}>
      <LinearProgress
        color="success"
        variant="determinate"
        value={Math.min(100, applyAnalysis ? percentage : 100)}
        sx={{
          height: 20,
          borderRadius: 5,
        }}
      />
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: 'bold',
          color: 'white',
          fontSize: '0.75rem',
        }}
      >
        {accumulated.toFixed(1)} {unit}
      </Typography>
      {
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            textAlign: 'center',
            fontSize: '0.7rem',
            color: 'text.secondary',
          }}
        >
          {subtitle}
        </Typography>
      }
    </Box>
  );
}

function MacroMeasurement() {
  const { currentModule } = useContext(CurrentModuleContext);
  const applyAnalysis = currentModule === Modules.CLIENT_PLANS;

  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification) as PlanificationBody;
  const { mealListState } = useMealsStates(currentModule);

  const getAccumulated = (key: MacroKey): number => mealListState?.reduce((accum, meal) => accum + (meal.macros[key] || 0), 0) || 0;

  const macrosConfig = [
    {
      key: 'protein' as const,
      total: planificationState.configuredMacros.totalProtein,
      unit: 'g',
      subtitleSuffix: applyAnalysis ? 'g. de proteína' : 'proteina',
    },
    {
      key: 'carbs' as const,
      total: planificationState.configuredMacros.totalCarbs,
      unit: 'g',
      subtitleSuffix: applyAnalysis ? 'g. de carbohidratos' : 'carbohidratos',
    },
    {
      key: 'fat' as const,
      total: planificationState.configuredMacros.totalFat,
      unit: 'g',
      subtitleSuffix: applyAnalysis ? 'g. de grasas' : 'grasas',
    },
    {
      key: 'calories' as const,
      total: planificationState.configuredMacros.planCalories,
      unit: 'cal',
      subtitleSuffix: applyAnalysis ? 'calorías' : 'calorías',
    },
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: '0 auto' }}>
      {macrosConfig.map(({ key, total, unit, subtitleSuffix }) => {
        const accumulated = getAccumulated(key);
        const percentage = total ? (accumulated * 100) / total : 0;

        return (
          <MacroBar
            key={key}
            percentage={percentage}
            accumulated={accumulated}
            unit={unit}
            subtitle={`${applyAnalysis ? total : ''} ${subtitleSuffix}`}
          />
        );
      })}
    </Box>
  );
}

export default MacroMeasurement;
