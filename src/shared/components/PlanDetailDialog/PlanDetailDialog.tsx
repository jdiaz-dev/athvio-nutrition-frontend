import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { DialogTitle, IconButton } from '@mui/material';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import MealDetail from 'src/shared/components/PlanDetailDialog/MealDetail';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';

function PlanDetailDialog({
  openPlanDetailDialog,
  setOpenPlanDetailDialog,
  domainOwnerId,
  planOwnerId,
}: {
  openPlanDetailDialog: boolean;
  setOpenPlanDetailDialog: (openPlanDetailDialog: boolean) => void;
  domainOwnerId: string;
  planOwnerId?: string;
}) {
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const currentModuleContext = useContext(CurrentModuleContext);
  const planState =
    currentModuleContext.currentModule === Modules.PROGRAMS
      ? useSelector((state: ReduxStates) => state.programs.plans).find((_plan) => _plan._id === planOwnerId)
      : useSelector((state: ReduxStates) => state.patientPlans.patientPlan);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [closeIconDialog, setCloseIconDialog] = useState(true);
  useEffect(() => {
    setMeals(planState?.meals || []);
  }, [planState]);

  useEffect(() => {
    if (!closeIconDialog) {
      console.log('------------entried');
      reloadRecordListContext.setReloadRecordList(true);
      setOpenPlanDetailDialog(false);
    }
  }, [closeIconDialog]);

  const addMealPlanHandler = () => {
    setMeals(meals.concat([{ ...programInitialState.mealBasicInfo, ...programInitialState.mealDetails }]));
  };

  return (
    <>
      <Dialog
        open={openPlanDetailDialog}
        onClose={() => {
          console.log('--------------onclose?');
          setOpenPlanDetailDialog(false);
        }}
        maxWidth="xl"
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Create your custom pro recipeeee
          {closeIconDialog ? (
            <IconButton
              aria-label="close"
              onClick={() => {
                console.log('--------------onclik?');
                setOpenPlanDetailDialog(false);
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          {domainOwnerId &&
            meals.map((meal, index) => (
              <MealDetail key={index} domainOwnerId={domainOwnerId} planOwnerId={planOwnerId as string} meal={meal} />
            ))}
          <Button variant="contained" onClick={() => addMealPlanHandler()}>
            Add meal
          </Button>
        </DialogContent>
        {/* <DialogActions></DialogActions> */}
      </Dialog>
    </>
  );
}

export default PlanDetailDialog;
