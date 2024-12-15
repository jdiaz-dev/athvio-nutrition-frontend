/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog, { savedPlanButton$ } from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import DuplicateProgramPlan from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/DuplicateProgramPlan';
import CustomAddIcon from 'src/shared/components/Icons/CustomAddIcon';
import CustomIconWrapper from 'src/shared/components/Icons/CustomIconWrapper';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { CreateProgramPlanBody } from 'src/modules/professionals/programs/adapters/out/Plan.types';
import * as MealsListSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealsListSlice';
import { ReduxItemtatus, temporalId } from 'src/shared/Consts';

function ProgramPlanItemButtons({ planDay, planWeek, program }: { planDay: number; planWeek: number; program: string }) {
  const authContext = useContext(AuthContext);

  const planState = useSelector((state: ReduxStates) => state.programs.plan);
  const mealListState = useSelector((state: ReduxStates) => state.programs.mealList);

  const dispatch = useDispatch();
  const { createProgramPlan } = usePlan();
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);

  const createProgramPlanHandler = async () => {
    const meals = mealListState
      .filter(
        (item) => item._id.includes(temporalId) && item.status !== ReduxItemtatus.DELETED && item.status !== ReduxItemtatus.INITIALIZED,
      )
      .map(({ _id, status, ...rest }) => ({ ...rest }));

    const input: CreateProgramPlanBody = {
      professional: authContext.professional,
      program,
      planBody: {
        week: planWeek,
        day: planDay,
        title: '',
        meals,
      },
    };
    await createProgramPlan(input);
    setPlanSaved(false);
  };

  useEffect(() => {
    if (openPlanDetailDialog) {
      const subscription = savedPlanButton$.subscribe((saved: boolean) => {
        setPlanSaved(saved);
      });

      return () => {
        return subscription.unsubscribe();
      };
    }
  }, [openPlanDetailDialog]);

  useEffect(() => {
    if (planSaved) {
      void createProgramPlanHandler();
    }
  }, [planSaved]);

  const programPlanClickedHandler = () => {
    setOpenPlanDetailDialog(true);
    dispatch(MealsListSlice.initializeMeals([]));
  };
  return (
    <>
      <CustomIconWrapper>
        <CustomAddIcon handler={programPlanClickedHandler} />
      </CustomIconWrapper>
      <CustomIconWrapper>
        <DuplicateProgramPlan newWeek={planWeek} newDay={planDay} />
      </CustomIconWrapper>

      {openPlanDetailDialog && planState._id.length > 0 ? (
        <PlanDetailDialog planDay={planDay} openPlanDetailDialog={openPlanDetailDialog} setOpenPlanDetailDialog={setOpenPlanDetailDialog} />
      ) : (
        openPlanDetailDialog && (
          <PlanDetailDialog
            planDay={planDay}
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
          />
        )
      )}
    </>
  );
}

export default ProgramPlanItemButtons;
