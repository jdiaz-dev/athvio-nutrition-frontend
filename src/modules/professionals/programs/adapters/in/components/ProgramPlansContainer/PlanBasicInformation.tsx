import React, { useState } from 'react';
import PlanDetailDialog from 'src/modules/professionals/programs/adapters/in/dialogs/PlanDetailDialog/PlanDetailDialog';
import { PlanDayInfo } from 'src/modules/professionals/programs/adapters/out/program.types';

function PlanBasicInformation({ program, plan }: { program: string; plan: PlanDayInfo }) {
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);

  return (
    <>
      <div onClick={() => setOpenPlanDetailDialog(true)}>{plan.totalMeals} meals</div>
      {openPlanDetailDialog && (
        <PlanDetailDialog
          openPlanDetailDialog={openPlanDetailDialog}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
          program={program}
          planId={plan._id || ''}
        />
      )}
    </>
  );
}

export default PlanBasicInformation;
