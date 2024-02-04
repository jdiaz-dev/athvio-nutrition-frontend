/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { PlanContext } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanContext';
import { mealPlanCreatedChange$ } from 'src/shared/components/PlanDetailDialog/MealDetail';
import DuplicateProgramPlan from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/DuplicateProgramPlan';
import CustomAddIcon from 'src/shared/components/Icons/CustomAddIcon';
import CustomIconWrapper from 'src/shared/components/Icons/CustomIconWrapper';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function ProgramPlanItemButtons({ planDay, planWeek, program }: { planDay: number; planWeek: number; program: string }) {
  const authContext = useContext(AuthContext);
  const planState = useSelector((state: ReduxStates) => state.programs.plan);
  const { createPlan, deletePlan } = usePlan();
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);
  const [planCrated, setPlanCrated] = useState(false);
  const [mealPlanCreated, setMealPlanCreated] = useState(false);

  useEffect(() => {
    const createProgramPlanHandler = async () => {
      const input = {
        professional: authContext.professional,
        program,
        week: planWeek,
        day: planDay,
      };
      await createPlan(input);
      setPlanCrated(true);
    };

    if (openPlanDetailDialog) {
      void createProgramPlanHandler();
    }
  }, [authContext.professional, openPlanDetailDialog]);

  useEffect(() => {
    const deletePlanHandler = async () => {
      const input = {
        professional: authContext.professional,
        program,
        plan: planState._id,
      };
      await deletePlan(input);
    };
    if (planCrated && !mealPlanCreated && !openPlanDetailDialog) {
      void deletePlanHandler();
    }
  }, [openPlanDetailDialog]);

  useEffect(() => {
    if (openPlanDetailDialog) {
      const subscription = mealPlanCreatedChange$.subscribe((val) => {
        setMealPlanCreated(val);
      });

      return () => {
        return subscription.unsubscribe();
      };
    }
  }, [openPlanDetailDialog]);

  return (
    <>
      <CustomIconWrapper>
        <CustomAddIcon handler={() => setOpenPlanDetailDialog(true)} />
      </CustomIconWrapper>
      <CustomIconWrapper>
        <DuplicateProgramPlan newWeek={planWeek} newDay={planDay} />
      </CustomIconWrapper>

      {openPlanDetailDialog && planState._id.length > 0 ? (
        <PlanContext.Provider value={{ isFromRecentlyCreatedPlan: true }}>
          <PlanDetailDialog
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
            domainOwnerId={program}
            planOwnerId={planState._id}
          />
        </PlanContext.Provider>
      ) : (
        openPlanDetailDialog && (
          <PlanDetailDialog
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
            domainOwnerId={program}
          />
        )
      )}
    </>
  );
}

export default ProgramPlanItemButtons;
