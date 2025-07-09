import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import PlanDetailDialog, { savedPlanButton$ } from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { usePatientPlan } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PatientPlanActions';
import CustomIconWrapper from 'src/shared/components/Icons/CustomIconWrapper';
import CustomAddIcon from 'src/shared/components/Icons/CustomAddIcon';
import DuplicatePatientPlan from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/DuplicateProgramPlan';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import * as MealsListSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealsListSlice';
import { ReduxItemtatus, temporalId } from 'src/shared/Consts';

const CreatePatientPlanButton = memo(function CreatePatientPlanButton({
  patient,
  assignedDate,
}: {
  patient: string;
  assignedDate: string;
}) {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const patientPlanState = useSelector((state: ReduxStates) => state.patientPlans.patientPlan);
  const { createPatientPlan } = usePatientPlan();
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);
  const mealListState = useSelector((state: ReduxStates) => state.patientPlans.mealList);

  const createPatientPlanHandler = async () => {
    const meals = mealListState
      .filter(
        (item) => item.uuid.includes(temporalId) && item.status !== ReduxItemtatus.DELETED && item.status !== ReduxItemtatus.INITIALIZED,
      )
      .map(({ uuid, status, ...rest }) => ({ ...rest }));

    const input = {
      professional: authContext.professional,
      patient,
      assignedDate,
      meals,
    };
    await createPatientPlan(input);
    setPlanSaved(false);
  };

  useEffect(() => {
    if (openPlanDetailDialog) {
      const subscription = savedPlanButton$.subscribe((val: boolean) => {
        setPlanSaved(val);
      });

      return () => {
        return subscription.unsubscribe();
      };
    }
  }, [openPlanDetailDialog]);

  useEffect(() => {
    if (planSaved) {
      void createPatientPlanHandler();
    }
  }, [planSaved]);

  const openPlanDetailDialogMemoized = useMemo(() => openPlanDetailDialog, [openPlanDetailDialog]);
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
        <DuplicatePatientPlan patient={patient} assignedDate={assignedDate} />
      </CustomIconWrapper>
      {/* todo: enhance logic to open dialog that it is being created, test use useMemo */}
      {openPlanDetailDialogMemoized && patientPlanState?.uuid.length > 0 ? (
        <PlanDetailDialog
          planDay={assignedDate}
          openPlanDetailDialog={openPlanDetailDialogMemoized}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
        />
      ) : (
        openPlanDetailDialogMemoized && (
          <PlanDetailDialog
            planDay={assignedDate}
            openPlanDetailDialog={openPlanDetailDialogMemoized}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
          />
        )
      )}
    </>
  );
});
export default CreatePatientPlanButton;
