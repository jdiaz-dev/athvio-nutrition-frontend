import React, { useState } from 'react';
import PlansDetailDialog from 'src/modules/professionals/programs/adapters/in/dialogs/PlansDetailDialog/PlansDetailDialog';
import { Plan } from 'src/modules/professionals/programs/adapters/out/program.types';

function PlanBasicInformation({ program, plan }: { program: string; plan: Plan }) {
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);

  return (
    <>
      <div onClick={() => setOpenPlanDetailDialog(true)}>{plan.mealPlans.length} meals</div>
      {openPlanDetailDialog && (
        <PlansDetailDialog
          openPlanDetailDialog={openPlanDetailDialog}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
          dayPlan={plan.day}
          program={program}
          plan={plan}
        />
      )}
    </>
  );
}

export default PlanBasicInformation;
