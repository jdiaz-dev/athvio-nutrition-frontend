import React, { ReactNode, useContext } from 'react';
import MealNamesList from 'src/shared/components/PlanBucket/MealNamesList';
import CustomDraggable from 'src/shared/components/Icons/CustomDraggable';
import { PlanDayInfo, ReduxStates } from 'src/shared/types/types';
import { makeStyles } from 'tss-react/mui';
import { Box, LinearProgress, useTheme, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';

const styles = makeStyles()(() => {
  return {
    numberMealsContainer: {
      display: 'flex',
    },
  };
});

function PlanBucket({ children, planDayInfo, handler }: { children: ReactNode; planDayInfo: PlanDayInfo; handler: () => void }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification);
  const { classes } = styles();
  const theme = useTheme();

  const totalCalories = planDayInfo.meals?.reduce((accum, meal) => accum + (meal.macros.calories || 0), 0) || 0;
  const currentCaloriesPercentage =
    planificationState !== null ? (totalCalories * 100) / planificationState.configuredMacros.planCalories : 0;

  return (
    <div style={{ width: '100%' }}>
      <div className={classes.numberMealsContainer}>
        <div style={{ width: '60%' }} onClick={handler}></div>
        <div style={{ width: '30%' }}>
          {children}
          <CustomDraggable />
        </div>
      </div>

      <Box sx={{ position: 'relative', width: '100%' }}>
        <LinearProgress
          color="success"
          variant="determinate"
          {...(currentModuleContext.currentModule === Modules.CLIENT_PLANS && { value: Math.min(100, currentCaloriesPercentage) })}
          sx={{
            'height': 20,
            'borderRadius': 5,
            'backgroundColor': theme.palette.success.light,
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme.palette.success.dark,
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '0.75rem',
          }}
        >
          {totalCalories?.toFixed(0)} cal
        </Typography>
      </Box>

      <MealNamesList meals={planDayInfo.meals || []} handler={handler} />
    </div>
  );
}

export default PlanBucket;
