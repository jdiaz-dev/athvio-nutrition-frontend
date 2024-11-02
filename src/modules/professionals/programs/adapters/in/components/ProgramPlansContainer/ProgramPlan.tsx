import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { ProgramMessages } from 'src/shared/Consts';
import { PlanDayInfo } from 'src/shared/types/types';

import CustomTrashIcon from 'src/shared/components/Icons/CustomTrashIcon';
import PlanBucket from 'src/shared/components/PlanBucket/PlanBucket';
import CopyProgramPlan from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/CopyProgramPlan';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { PlanDialogContext } from 'src/shared/context/PlanDialogContext';

//todo: check all the params
function ProgramPlan({ program, planDay, planDayInfo }: { program: string; planDay: number; planDayInfo: PlanDayInfo }) {
  const authContext = useContext(AuthContext);
  const planDialogContext = useContext(PlanDialogContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(planDialogContext.planDay === planDay ? true : false);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();

  const { deletePlan } = usePlan();
  const deletePlanHandler = () => {
    setOpenDialog(true);
    setMessage(ProgramMessages.REMOVE_PLAN);
    setAlert(true);
  };
  useEffect(() => {
    const deletePlanHelper = async () => {
      //todo: delete first in redux after in db
      await deletePlan({
        professional: authContext.professional,
        program,
        plan: planDayInfo._id as string,
      });
      reloadRecordListContext.setReloadRecordList(true);
      setAlert(false);
    };

    if (messageOk) void deletePlanHelper();
  }, [messageOk]);
  return (
    <>
      <PlanBucket planDayInfo={planDayInfo} handler={() => setOpenPlanDetailDialog(true)}>
        {/* TODO: urgent - after to copy plan to another day, it doesn't show meals in dialog */}
        <CopyProgramPlan plan={planDayInfo._id as unknown as string} />
      </PlanBucket>
      <CustomTrashIcon handler={deletePlanHandler} />
      {openPlanDetailDialog && (
        <PlanDetailDialog
          planDay={planDay}
          openPlanDetailDialog={openPlanDetailDialog}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
          domainOwnerId={program}
          planOwnerId={planDayInfo._id || ''}
        />
      )}
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
    </>
  );
}

export default ProgramPlan;
