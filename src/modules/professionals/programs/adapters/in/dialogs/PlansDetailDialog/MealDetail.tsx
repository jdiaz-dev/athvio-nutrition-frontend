/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfessionalIdContext } from 'src/App';
import * as ProgramSlicers from 'src/modules/professionals/programs/adapters/in/ProgramSlice';
import { useMealPlan } from 'src/modules/professionals/programs/adapters/out/MealPlanActions';
import { MealPlan } from 'src/modules/professionals/programs/adapters/out/program.types';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import { Modules } from 'src/shared/Consts';
import { ReduxStates } from 'src/shared/types/types';
import { makeStyles } from 'tss-react/mui';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      marginBottom: '30px',
      padding: '0px',
    },
  };
});

function MealDetail({ program, plan, mealPlan: { position, ...restMealPlan } }: { program: string; plan: string; mealPlan: MealPlan }) {
  const { classes } = cardStyles();
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const mealPlanState = useSelector((state: ReduxStates) => state.programs.mealPlan);
  const dispatch = useDispatch();
  const { createMealPlan, updateMealPlan } = useMealPlan();
  const [mealNameUpdated, setMealNameUpdated] = useState(false);
  const [componentTouched, setComponentTouched] = useState(false);
  console.log(' ------------------ restMealPlan', restMealPlan);

  useEffect(() => {
    if (restMealPlan !== undefined) {
      dispatch(ProgramSlicers.acceptNewMealDetail(restMealPlan));
    } else {
      dispatch(ProgramSlicers.reinitializeMeal());
    }
    return () => {
      dispatch(ProgramSlicers.reinitializeMeal());
    };
  }, []);

  /* useEffect(() => {
    const updateMealPlanHelper = async (): Promise<void> => {
      await updateMealPlan({
        professional: professionalIdContext.professional,
        program,
        plan: _id as string,
        mealPlan: _id as string,
        mealPlanBody: { position, ...rest },
      });
    };

    if (mealNameUpdated) {
      void updateMealPlanHelper();
      setMealNameUpdated(false);
    }
  }, [mealNameUpdated]); */

  const componentClickedHandler = () => {
    dispatch(ProgramSlicers.acceptNewMealDetail(restMealPlan));
    setComponentTouched(true);
  };
  const createUpdateMealPlanHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = mealPlanState;
    if (mealPlanState._id.length == 0 && mealNameUpdated) {
      await createMealPlan({
        professional: professionalIdContext.professional,
        program,
        plan,
        mealPlanBody: { position, ...rest },
      });
      reloadRecordListContext.setReloadRecordList(true);
    } else {
      await updateMealPlan({
        professional: professionalIdContext.professional,
        program,
        plan,
        mealPlan: mealPlanState._id,
        mealPlanBody: { position, ...rest },
      });
      reloadRecordListContext.setReloadRecordList(true);
    }
  };

  const mealPlan = () => (componentTouched ? mealPlanState : restMealPlan);
  return (
    <>
      <Card
        onMouseLeave={() => {
          if (componentTouched) void createUpdateMealPlanHandler();
          setComponentTouched(false);
        }}
        onClick={() => {
          if (!componentTouched) componentClickedHandler();
        }}
        style={{ width: '55%' }}
        sx={{ minWidth: 275 }}
        className={classes.card}
        variant="outlined"
      >
        <CurrentModuleContext.Provider value={{ currentModule: Modules.PROGRAMS }}>
          <MealBuilder meal={mealPlan()} setMealNameUpdated={setMealNameUpdated} />
        </CurrentModuleContext.Provider>
      </Card>
    </>
  );
}

export default MealDetail;
