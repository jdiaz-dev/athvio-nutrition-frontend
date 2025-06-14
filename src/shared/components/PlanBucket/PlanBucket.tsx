import React, { ReactNode } from 'react';
import MealNamesList from 'src/shared/components/PlanBucket/MealNamesList';
import CustomDraggable from 'src/shared/components/Icons/CustomDraggable';
import { PlanDayInfo } from 'src/shared/types/types';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material';

const styles = makeStyles()(() => {
  return {
    numberMealsContainer: {
      display: 'flex',
    },
  };
});

function PlanBucket({ children, planDayInfo, handler }: { children: ReactNode; planDayInfo: PlanDayInfo; handler: () => void }) {
  const { classes } = styles();
  const theme = useTheme();

  const totalCalories = planDayInfo.meals?.reduce((accum, meal) => accum + (meal.macros.calories || 0), 0);
  return (
    <div style={{ width: '100%' }}>
      <div className={classes.numberMealsContainer}>
        <div style={{ width: '60%' }} onClick={handler}></div>
        <div style={{ width: '30%' }}>
          {children}
          <CustomDraggable />
        </div>
      </div>
      <div style={{ textAlign: 'center', borderRadius: '4px', backgroundColor: theme.palette.success.dark }}>
        {totalCalories?.toFixed(0)} cal
      </div>

      <MealNamesList meals={planDayInfo.meals || []} handler={handler} />
    </div>
  );
}

export default PlanBucket;
