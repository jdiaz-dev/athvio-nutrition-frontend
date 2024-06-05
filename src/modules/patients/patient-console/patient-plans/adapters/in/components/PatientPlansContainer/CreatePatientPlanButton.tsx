/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import PlanDetailDialog from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { PlanContext } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanContext';
import { usePatientPlan } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PatientPlanActions';
import { mealPlanCreatedChange$ } from 'src/shared/components/PlanDetailDialog/MealDetail';
import CustomIconWrapper from 'src/shared/components/Icons/CustomIconWrapper';
import CustomAddIcon from 'src/shared/components/Icons/CustomAddIcon';
import DuplicatePatientPlan from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/DuplicateProgramPlan';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function CreatePatientPlanButton({ patient, assignedDate }: { patient: string; assignedDate: Date }) {
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
      await createPatientPlan(input);
      setPlanCreated(true);
    };

    if (openPlanDetailDialog) {
      void createPatientPlanHandler();
    }
  }, [authContext.professional, openPlanDetailDialog]);

  useEffect(() => {
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
      const subscription = mealPlanCreatedChange$.subscribe((val) => {
        setMealPlanCreated(val);
      });

      return () => {
        return subscription.unsubscribe();
      };
    }
  }, [openPlanDetailDialog]);
  console.log('-------------openPlanDetailDialog', openPlanDetailDialog)
  return (
    <>
      <CustomIconWrapper>
        <CustomAddIcon handler={() => setOpenPlanDetailDialog(true)} />
      </CustomIconWrapper>
      <CustomIconWrapper>
        <DuplicatePatientPlan patient={patient} assignedDate={assignedDate} />
      </CustomIconWrapper>
      {openPlanDetailDialog && patientPlanState._id.length > 0 ? (
        <PlanContext.Provider value={{ isFromRecentlyCreatedPlan: true }}>
          <PlanDetailDialog
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
            domainOwnerId={patient}
            planOwnerId={patientPlanState._id}
          />
        </PlanContext.Provider>
      ) : (
        openPlanDetailDialog && (
          <PlanDetailDialog
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
            domainOwnerId={patient}
          />
        )
      )}
    </>
  );
}

export default CreatePatientPlanButton;
