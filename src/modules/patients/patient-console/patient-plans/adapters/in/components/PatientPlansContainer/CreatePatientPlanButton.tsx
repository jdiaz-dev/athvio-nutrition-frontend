/* eslint-disable max-len */
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

const CreatePatientPlanButton = memo(function CreatePatientPlanButton({ patient, assignedDate }: { patient: string; assignedDate: Date }) {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const patientPlanState = useSelector((state: ReduxStates) => state.patientPlans.patientPlan);
  const { createPatientPlan, deletePatientPlan } = usePatientPlan();
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);
  const [planCreated, setPlanCreated] = useState(false);
  const [mealPlanCreated, setMealPlanCreated] = useState(false);
  useEffect(() => {
    const createPatientPlanHandler = async () => {
      const input = {
        professional: authContext.professional,
        patient,
        assignedDate,
      };
      //todo: create patient plan only in redux
      await createPatientPlan(input);
      setPlanCreated(true);
    };

    if (openPlanDetailDialog) {
      void createPatientPlanHandler();
    }
  }, [authContext.professional, openPlanDetailDialog]);

  useEffect(() => {
    //todo: delete patient plan only in redux
    const deletePatientPlanHandler = async () => {
      const input = {
        professional: authContext.professional,
        patient,
        patientPlan: patientPlanState._id,
      };
      await deletePatientPlan(input);
    };
    if (planCreated && !mealPlanCreated && !openPlanDetailDialog) {
      void deletePatientPlanHandler();
    }
  }, [openPlanDetailDialog]);

  useEffect(() => {
    if (openPlanDetailDialog) {
      const subscription = savedPlanButton$.subscribe((val) => {
        setMealPlanCreated(val);
      });

      return () => {
        return subscription.unsubscribe();
      };
    }
  }, [openPlanDetailDialog]);
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
      {openPlanDetailDialogMemoized && patientPlanState?._id.length > 0 ? (
        <PlanDetailDialog
          planDay={assignedDate.toDateString()}
          openPlanDetailDialog={openPlanDetailDialogMemoized}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
        />
      ) : (
        openPlanDetailDialogMemoized && (
          <PlanDetailDialog
            planDay={assignedDate.toDateString()}
            openPlanDetailDialog={openPlanDetailDialogMemoized}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
          />
        )
      )}
    </>
  );
});
export default CreatePatientPlanButton;
