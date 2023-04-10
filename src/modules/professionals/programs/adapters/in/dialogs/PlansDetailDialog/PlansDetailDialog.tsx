import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { MealPlan, Plan } from 'src/modules/professionals/programs/adapters/out/program.types';
import MealDetail from 'src/modules/professionals/programs/adapters/in/dialogs/PlansDetailDialog/MealDetail';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/ProgramSlice';

function PlansDetailDialog({
  openPlanDetailDialog,
  setOpenPlanDetailDialog,
  dayPlan,
  program,
  plan,
}: {
  openPlanDetailDialog: boolean;
  setOpenPlanDetailDialog: (openPlanDetailDialog: boolean) => void;
  dayPlan: number;
  program?: string;
  plan?: Plan;
}) {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(plan?.mealPlans || []);

  const addMealPlanHandler = () => {
    setMealPlans(mealPlans.concat([{ position: 0, ...programInitialState.mealPlan }]));
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
        <DialogContent>
          {program &&
            plan &&
            mealPlans.map((mealPlan, index) => <MealDetail key={index} program={program} plan={plan._id} mealPlan={mealPlan} />)}
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

export default PlansDetailDialog;
