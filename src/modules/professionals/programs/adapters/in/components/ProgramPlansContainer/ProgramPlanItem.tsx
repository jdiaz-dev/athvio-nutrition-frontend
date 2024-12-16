import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog, { savedPlanButton$ } from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { ProgramMessages, ReduxItemtatus, temporalId } from 'src/shared/Consts';
import { PlanDayInfo, ReduxStates } from 'src/shared/types/types';

import CustomTrashIcon from 'src/shared/components/Icons/CustomTrashIcon';
import PlanBucket from 'src/shared/components/PlanBucket/PlanBucket';
import CopyProgramPlan from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/CopyProgramPlan';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import * as MealsListSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealsListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { usePlanMeal } from 'src/modules/professionals/programs/adapters/out/MealActions';

//todo: check all the params
function ProgramPlanItem({ program, planDay, planDayInfo }: { program: string; planDay: number; planDayInfo: PlanDayInfo }) {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const programPlanState = useSelector((state: ReduxStates) => state.programs.plans).find((_plan) => _plan._id === planDayInfo._id);
  const mealListState = useSelector((state: ReduxStates) => state.programs.mealList);

  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();
  const stringDay = `Day ${planDay.toString()}`;

  const { deletePlan } = usePlan();
  const { programPlanMealCRUD } = usePlanMeal();
  const programPlanMealsHandler = async () => {
    const baseData = {
      professional: authContext.professional,
      program,
      plan: planDayInfo._id as string,
    };

    const toAddInput = mealListState
      .filter(
        (item) => item._id.includes(temporalId) && item.status !== ReduxItemtatus.DELETED && item.status !== ReduxItemtatus.INITIALIZED,
      )
      .map(({ _id, status, ...rest }) => ({ ...rest }));

    const toUpdateInput = mealListState
      .filter((item) => !item._id.includes(temporalId) && item.status === ReduxItemtatus.UPDATED)
      .map(({ _id, status, ...rest }) => ({ ...rest, meal: _id }));

    const toDeleteInput = mealListState
      .filter((item) => !item._id.includes(temporalId) && item.status === ReduxItemtatus.DELETED)
      .map(({ _id }) => _id);
    await programPlanMealCRUD({
      toAddInput: {
        ...baseData,
        meals: toAddInput,
      },
      toUpdateInput: {
        ...baseData,
        meals: toUpdateInput,
      },
      toDeleteInput: {
        ...baseData,
        meals: toDeleteInput,
      },
      shouldToAdd: toAddInput.length >= 1 ? true : false,
      shouldToUpdate: toUpdateInput.length >= 1 ? true : false,
      shouldToDelete: toDeleteInput.length >= 1 ? true : false,
    });
    setPlanSaved(false);
  };

  useEffect(() => {
    if (openPlanDetailDialog) {
      const subscription = savedPlanButton$.subscribe((saved: boolean) => {
        if (saved) setPlanSaved(saved);
      });

      return () => {
        return subscription.unsubscribe();
      };
    }
  }, [openPlanDetailDialog]);

  useEffect(() => {
    const deletePlanHelper = async () => {
      //todo: delete first in redux after in db
      await deletePlan({
        professional: authContext.professional,
        program,
        plan: planDayInfo._id as string,
      });
      reloadRecordListContext.setReloadRecordList(true);
      setAlert(false);
    };

    if (messageOk) void deletePlanHelper();
  }, [messageOk]);

  useEffect(() => {
    if (planSaved) {
      void programPlanMealsHandler();
    }
  }, [planSaved]);

  const deletePlanHandler = () => {
    setOpenDialog(true);
    setMessage(ProgramMessages.REMOVE_PLAN);
    setAlert(true);
  };

  const programPlanClickedHandler = () => {
    setOpenPlanDetailDialog(true);
    if (programPlanState) {
      dispatch(MealsListSlice.initializeMeals(programPlanState.meals));
    }
  };

  return (
    <>
      <PlanBucket planDayInfo={planDayInfo} handler={programPlanClickedHandler}>
        {/* TODO: urgent - after to copy plan to another day, it doesn't show meals in dialog */}
        <CopyProgramPlan plan={planDayInfo._id as unknown as string} />
      </PlanBucket>
      <CustomTrashIcon handler={deletePlanHandler} />
      {openPlanDetailDialog && (
        <PlanDetailDialog
          planDay={stringDay}
          openPlanDetailDialog={openPlanDetailDialog}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
        />
      )}
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
    </>
  );
}

export default ProgramPlanItem;
