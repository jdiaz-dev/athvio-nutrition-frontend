import React, { useContext } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useMealsStates } from 'src/shared/components/PlanDetailDialog/useMealsStates';
import { PlanificationBody } from 'src/modules/patients/patient-console/planifications/helpers/planifications';

function MacroMeasurement() {
  const currentModuleContext = useContext(CurrentModuleContext);

  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification) as PlanificationBody;
  const { mealListState } = useMealsStates(currentModuleContext.currentModule);

  const accumulatedProtein = mealListState?.reduce((accum, meal) => accum + (meal.macros.protein || 0), 0) || 0;
  const currentProteinPercentage = (accumulatedProtein * 100) / planificationState.configuredMacros.totalProtein;

  const accumulatedCarbs = mealListState?.reduce((accum, meal) => accum + (meal.macros.carbs || 0), 0) || 0;
  const currentCarbsPercentage = (accumulatedCarbs * 100) / planificationState.configuredMacros.totalCarbs;

  const accumulatedFat = mealListState?.reduce((accum, meal) => accum + (meal.macros.fat || 0), 0) || 0;
  const currentFatPercentage = (accumulatedFat * 100) / planificationState.configuredMacros.totalFat;

  const accumulatedCalories = mealListState?.reduce((accum, meal) => accum + (meal.macros.calories || 0), 0) || 0;
  const currentCaloriesPercentage = (accumulatedCalories * 100) / planificationState.configuredMacros.planCalories;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: '0 auto' }}>
      <Box sx={{ position: 'relative', width: '23%' }}>
        <LinearProgress
          color="success"
          variant="determinate"
          value={Math.min(100, currentProteinPercentage)}
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
          {accumulatedProtein?.toFixed(1)} g
        </Typography>
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
          {planificationState.configuredMacros.totalProtein} g. de proteina
        </Typography>
      </Box>
      <Box sx={{ position: 'relative', width: '23%' }}>
        <LinearProgress
          color="success"
          variant="determinate"
          value={Math.min(100, currentCarbsPercentage)}
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
          {accumulatedCarbs?.toFixed(1)} g
        </Typography>
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
          {planificationState.configuredMacros.totalCarbs} g. de carbohidratos
        </Typography>
      </Box>
      <Box sx={{ position: 'relative', width: '23%' }}>
        <LinearProgress
          color="success"
          variant="determinate"
          value={Math.min(100, currentFatPercentage)}
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
          {accumulatedFat?.toFixed(1)} g
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          {planificationState.configuredMacros.totalFat} g. de grasas
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', width: '23%' }}>
        <LinearProgress
          color="success"
          variant="determinate"
          value={Math.min(100, currentCaloriesPercentage)}
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
          {accumulatedCalories?.toFixed(1)} cal
        </Typography>
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
          {planificationState.configuredMacros.planCalories} calorias
        </Typography>
      </Box>
    </Box>
  );
}

export default MacroMeasurement;
