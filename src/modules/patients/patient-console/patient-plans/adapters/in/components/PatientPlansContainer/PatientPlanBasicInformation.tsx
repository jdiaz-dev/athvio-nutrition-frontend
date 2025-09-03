import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog, { savedPlanButton$ } from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { ProgramMessages, ReduxItemtatus, temporalId } from 'src/shared/Consts';
import { usePatientPlan } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PatientPlanActions';
import { PlanDayInfo, ReduxStates } from 'src/shared/types/types';
import { useDispatch, useSelector } from 'react-redux';
import PlanBucket from 'src/shared/components/PlanBucket/PlanBucket';
import CopyPatientPlan from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/CopyPatientPlan';
import CustomTrashIcon from 'src/shared/components/Icons/CustomTrashIcon';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { usePatientPlanMeal } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PlanMealActions';
import * as MealsListSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealsListSlice';

function PatientPlanBasicInformation({ patient, plan, assignedDate }: { patient: string; plan: PlanDayInfo; assignedDate: string }) {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const patientPlansState = useSelector((state: ReduxStates) => state.patientPlans.patientPlans).find((_plan) => _plan.uuid === plan.uuid);
  const mealListState = useSelector((state: ReduxStates) => state.patientPlans.mealList);

  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);
  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();
  const [planSaved, setPlanSaved] = useState(false);

  const { deletePatientPlan } = usePatientPlan();
  const { patientPlanMealCrud } = usePatientPlanMeal();
  const dispatch = useDispatch();

  const deletePlanHandler = () => {
    setOpenDialog(true);
    setMessage(ProgramMessages.REMOVE_PLAN);
    setAlert(true);
  };

  const patientPlanMealsHandler = async () => {
    const baseData = {
      professional: authContext.professional,
      patient,
      patientPlan: plan.uuid as string,
    };

    const toAddInput = mealListState
      .filter(
        (item) => item.uuid.includes(temporalId) && item.status !== ReduxItemtatus.DELETED && item.status !== ReduxItemtatus.INITIALIZED,
      )
      .map(({ uuid, status, ...rest }) => ({ ...rest }));

    const toUpdateInput = mealListState
      .filter((item) => !item.uuid.includes(temporalId) && item.status === ReduxItemtatus.UPDATED)
      .map(({ uuid, status, ...rest }) => ({ ...rest, meal: uuid }));

    const toDeleteInput = mealListState
      .filter((item) => !item.uuid.includes(temporalId) && item.status === ReduxItemtatus.DELETED)
      .map(({ uuid }) => uuid);
    await patientPlanMealCrud({
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
  const programPlanClickedHandler = () => {
    setOpenPlanDetailDialog(true);
    if (patientPlansState) {
      dispatch(MealsListSlice.initializeMeals(patientPlansState.meals));
    }
  };
  useEffect(() => {
    const deletePlanHelper = async () => {
      await deletePatientPlan({
        professional: authContext.professional,
        patient,
        patientPlan: plan.uuid as string,
      });
      reloadRecordListContext.setReloadRecordList(true);
      setAlert(false);
    };

    if (messageOk) void deletePlanHelper();
  }, [messageOk]);

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
    if (planSaved) {
      void patientPlanMealsHandler();
    }
  }, [planSaved]);

  const formattedDate = new Date(assignedDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <PlanBucket planDayInfo={plan} handler={programPlanClickedHandler}>
        <CopyPatientPlan plan={plan.uuid as unknown as string} />
      </PlanBucket>
      {openPlanDetailDialog && (
        <PlanDetailDialog
          planDay={formattedDate}
          openPlanDetailDialog={openPlanDetailDialog}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
        />
      )}
      <CustomTrashIcon handler={deletePlanHandler} />
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
    </>
  );
}

export default PatientPlanBasicInformation;
