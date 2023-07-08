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
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import { Meal } from 'src/shared/components/MealDetails/Meal.types';
import MealDetail from 'src/shared/components/MealDetails/MealDetail';

function PlanDetailDialog({
  openPlanDetailDialog,
  setOpenPlanDetailDialog,
  program,
  planId,
}: {
  openPlanDetailDialog: boolean;
  setOpenPlanDetailDialog: (openPlanDetailDialog: boolean) => void;
  program: string;
  planId?: string;
}) {
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const planState = useSelector((state: ReduxStates) => state.programs.plans).find((_plan) => _plan._id === planId);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [closeIconDialog, setCloseIconDialog] = useState(true);

  useEffect(() => {
    setMeals(planState?.meals || []);
  }, [planState]);

  useEffect(() => {
    if (!closeIconDialog) {
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
        onClose={() => setOpenPlanDetailDialog(false)}
        maxWidth="xl"
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Create your custom pro recipe
          {closeIconDialog ? (
            <IconButton
              aria-label="close"
              onClick={() => {
                setCloseIconDialog(false);
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
          <CurrentModuleContext.Provider value={{ currentModule: Modules.PROGRAMS }}>
            {program && meals.map((meal, index) => <MealDetail key={index} program={program} plan={planId as string} meal={meal} />)}
          </CurrentModuleContext.Provider>
          <Button onClick={() => addMealPlanHandler()}>Add meal</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPlanDetailDialog(false)}>Disagree</Button>
          <Button onClick={() => setOpenPlanDetailDialog(false)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PlanDetailDialog;

interface client {
  client: string;
  plan: string;
  meal: string;
}
interface program {
  program: string;
  plan: string;
  meal: string;
}

type owner<ownerData> = {
  [K in keyof ownerData]: string;
};

const test: owner<client> = {
  client: '',
  id: '',
};
