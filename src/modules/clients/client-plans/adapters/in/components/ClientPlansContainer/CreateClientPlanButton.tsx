/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { Button } from '@mui/material';
import PlanDetailDialog from 'src/modules/professionals/programs/adapters/in/dialogs/PlanDetailDialog/PlanDetailDialog';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { ProfessionalIdContext } from 'src/App';
import { PlanContext } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanContext';
import { useClientPlan } from 'src/modules/clients/client-plans/adapters/out/ClientPlanActions';

export const mealPlanCreatedChange = new Subject<boolean>();
const mealPlanCreatedChange$ = mealPlanCreatedChange.asObservable();

function CreateClientPlanButton({ client, assignedDate }: { client: string; assignedDate: Date }) {
  console.log('-----------client', client);
  console.log('-----------assignedDate', assignedDate);
  const professionalIdContext = useContext(ProfessionalIdContext);
  const planState = useSelector((state: ReduxStates) => state.programs.plan);

  const { createClientPlan, deleteClientPlan } = useClientPlan();
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);
  const [planCrated, setPlanCrated] = useState(false);
  const [mealPlanCreated, setMealPlanCreated] = useState(false);

  useEffect(() => {
    const createClientPlanHandler = async () => {
      const input = {
        professional: professionalIdContext.professional,
        client,
        assignedDate,
      };
      await createClientPlan(input);
      setPlanCrated(true);
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
        clientPlan: 'planState._id',
      };
      await deleteClientPlan(input);
    };
    if (planCrated && !mealPlanCreated && !openPlanDetailDialog) {
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

      {openPlanDetailDialog && planState._id.length > 0 ? (
        <PlanContext.Provider value={{ isFromRecentlyCreatedPlan: true }}>
          <PlanDetailDialog
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
            domainOwnerId={client}
            planOwnerId={planState._id}
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
