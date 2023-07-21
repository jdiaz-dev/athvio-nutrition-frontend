/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import PlanDetailDialog from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { ProfessionalIdContext } from 'src/App';
import { PlanContext } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanContext';
import { useClientPlan } from 'src/modules/clients/client-plans/adapters/out/ClientPlanActions';
import { mealPlanCreatedChange$ } from 'src/shared/components/PlanDetailDialog/MealDetail';

function CreateClientPlanButton({ client, assignedDate }: { client: string; assignedDate: Date }) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const clientPlanState = useSelector((state: ReduxStates) => state.clientPlans.clientPlan);

  const { createClientPlan, deleteClientPlan } = useClientPlan();
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);
  const [planCreated, setPlanCreated] = useState(false);
  const [mealPlanCreated, setMealPlanCreated] = useState(false);

  useEffect(() => {
    const createClientPlanHandler = async () => {
      const input = {
        professional: professionalIdContext.professional,
        client,
        assignedDate,
      };
      await createClientPlan(input);
      setPlanCreated(true);
    };

    if (openPlanDetailDialog) {
      void createClientPlanHandler();
    }
  }, [professionalIdContext.professional, openPlanDetailDialog]);

  useEffect(() => {
    const deleteClientPlanHandler = async () => {
      const input = {
        professional: professionalIdContext.professional,
        client,
        clientPlan: clientPlanState._id,
      };
      await deleteClientPlan(input);
    };
    if (planCreated && !mealPlanCreated && !openPlanDetailDialog) {
      void deleteClientPlanHandler();
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
      <Button variant="outlined" onClick={() => setOpenPlanDetailDialog(true)}>
        Create plan
      </Button>

      {openPlanDetailDialog && clientPlanState._id.length > 0 ? (
        <PlanContext.Provider value={{ isFromRecentlyCreatedPlan: true }}>
          <PlanDetailDialog
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
            domainOwnerId={client}
            planOwnerId={clientPlanState._id}
          />
        </PlanContext.Provider>
      ) : (
        openPlanDetailDialog && (
          <PlanDetailDialog
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
            domainOwnerId={client}
          />
        )
      )}
    </>
  );
}

export default CreateClientPlanButton;
