import React, { useState } from 'react';
import { Button } from '@mui/material';
import PlansDetailDialog from 'src/modules/professionals/programs/adapters/in/dialogs/PlansDetailDialog/PlansDetailDialog';

function CreatePlanMealButton({ dayPlan }: { dayPlan: number }) {
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpenPlanDetailDialog(true)}>
        Add recipes
      </Button>
      <PlansDetailDialog openPlanDetailDialog={openPlanDetailDialog} setOpenPlanDetailDialog={setOpenPlanDetailDialog} dayPlan={dayPlan} />
    </div>
  );
}

export default CreatePlanMealButton;
