import React, { memo, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { DialogTitle } from '@mui/material';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import MealDetail from 'src/shared/components/PlanDetailDialog/MealDetail';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { PlanDialogContext, defaultPlanDay } from 'src/shared/context/PlanDialogContext';

const PlanDetailDialog = memo(function PlanDetailDialog({
  openPlanDetailDialog,
  setOpenPlanDetailDialog,
  domainOwnerId,
  planOwnerId,
  planDay,
}: {
  openPlanDetailDialog: boolean;
  setOpenPlanDetailDialog: (openPlanDetailDialog: boolean) => void;
  domainOwnerId: string;
  planOwnerId?: string;
  planDay: number;
}) {
  const planDialogContext = useContext(PlanDialogContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const currentModuleContext = useContext(CurrentModuleContext);
  const planState =
    currentModuleContext.currentModule === Modules.PROGRAMS
      ? useSelector((state: ReduxStates) => state.programs.plans).find((_plan) => _plan._id === planOwnerId)
      : useSelector((state: ReduxStates) => state.patientPlans.patientPlan);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  useEffect(() => {
    setMeals(planState?.meals || []);
  }, [planState]);

  useEffect(() => {
    if (!closedIconDialog) {
      reloadRecordListContext.setReloadRecordList(true);
      setOpenPlanDetailDialog(false);
    }
  }, [closedIconDialog]);

  const closeIconDialogHandler = () => {
    reloadRecordListContext.setReloadRecordList(true);
    setOpenPlanDetailDialog(false);
    planDialogContext.setPlanDay(defaultPlanDay);
  };
  const addMealPlanHandler = () => {
    setMeals(meals.concat([{ ...programInitialState.mealBasicInfo, ...programInitialState.mealDetails }]));
  };

  return (
    <>
      <Dialog
        open={openPlanDetailDialog}
        onClose={() => {
          setOpenPlanDetailDialog(false);
          planDialogContext.setPlanDay(defaultPlanDay);
        }}
        scroll='body'
        maxWidth="md"
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Day {planDay}
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent>
          {domainOwnerId &&
            meals.map((meal, index) => (
              <MealDetail key={index} domainOwnerId={domainOwnerId} planOwnerId={planOwnerId as string} meal={meal} planDay={planDay} />
            ))}
          <Button variant="contained" onClick={() => addMealPlanHandler()}>
            Add meal
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default PlanDetailDialog;
