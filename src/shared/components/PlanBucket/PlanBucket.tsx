import React, { ReactNode } from 'react';
import MealNamesList from 'src/shared/components/PlanBucket/MealNamesList';
import CustomDraggable from 'src/shared/components/Icons/CustomDraggable';
import { PlanDayInfo } from 'src/shared/types/types';
import { makeStyles } from 'tss-react/mui';

const styles = makeStyles()(() => {
  return {
    numberMealsContainer: {
      display: 'flex',
    },
  };
});

function PlanBucket({ children, planDayInfo, handler }: { children: ReactNode; planDayInfo: PlanDayInfo; handler: () => void }) {
  const { classes } = styles();

  return (
    <div style={{ width: '100%' }}>
      <div className={classes.numberMealsContainer}>
        <div style={{ width: '70%' }} onClick={handler}>
          {/* {planDayInfo.meals?.length} meals */}
        </div>
        <div style={{ width: '30%' }}>
          {children}
          <CustomDraggable />
        </div>
      </div>
      <MealNamesList meals={planDayInfo.meals || []} handler={handler} />
    </div>
  );
}

export default PlanBucket;
