import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { MealPlan } from 'src/modules/professionals/programs/adapters/out/program.types';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { DialogTitle, IconButton } from '@mui/material';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MealPlanDetail from 'src/modules/professionals/programs/adapters/in/dialogs/PlanDetailDialog/MealPlanDetail';

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

  const mealPlansState = useSelector((state: ReduxStates) => state.programs.plans).find((_plan) => _plan._id === planId)
    ?.mealPlans as unknown as MealPlan[] | undefined;
  console.log('----------planId', planId);
  console.log('----------mealPlansState', mealPlansState);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [closeIconDialog, setCloseIconDialog] = useState(true);

  useEffect(() => {
    setMealPlans(mealPlansState || []);
  }, [mealPlansState]);

  useEffect(() => {
    if (!closeIconDialog) {
      reloadRecordListContext.setReloadRecordList(true);
      setOpenPlanDetailDialog(false);
    }
  }, [closeIconDialog]);

  const addMealPlanHandler = () => {
    setMealPlans(mealPlans.concat([{ ...programInitialState.mealPlan }]));
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
          Create your custom recipe
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
          {program &&
            mealPlans.map((mealPlan, index) => (
              <MealPlanDetail key={index} program={program} plan={planId as string} mealPlan={mealPlan} />
            ))}
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
