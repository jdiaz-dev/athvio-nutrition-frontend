import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog from 'src/modules/professionals/programs/adapters/in/dialogs/PlanDetailDialog/PlanDetailDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProfessionalIdContext } from 'src/App';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { ProgramMessages } from 'src/shared/Consts';
import { useClientPlan } from 'src/modules/clients/client-plans/adapters/out/ClientPlanActions';
import { PlanDayInfo } from 'src/shared/types/types';

function ClientPlanBasicInformation({ client, plan }: { client: string; plan: PlanDayInfo }) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();

  const { deleteClientPlan } = useClientPlan();
  const deletePlanHandler = () => {
    setOpenDialog(true);
    setMessage(ProgramMessages.REMOVE_PLAN);
    setAlert(true);
  };
  useEffect(() => {
    const deletePlanHelper = async () => {
      await deleteClientPlan({
        professional: professionalIdContext.professional,
        client,
        clientPlan: plan._id as string,
      });
      reloadRecordListContext.setReloadRecordList(true);
      setAlert(false);
    };

    if (messageOk) void deletePlanHelper();
  }, [messageOk]);

  return (
    <>
      <div onClick={() => setOpenPlanDetailDialog(true)}>{plan.totalMeals} meals</div>
      {openPlanDetailDialog && (
        <PlanDetailDialog
          openPlanDetailDialog={openPlanDetailDialog}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
          domainOwnerId={client}
          planOwnerId={plan._id || ''}
        />
      )}
      <DeleteIcon onClick={deletePlanHandler} />
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
    </>
  );
}

export default ClientPlanBasicInformation;
