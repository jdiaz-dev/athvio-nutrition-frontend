import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProfessionalIdContext } from 'src/App';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { ProgramMessages } from 'src/shared/Consts';
import { useClientPlan } from 'src/modules/clients/client-plans/adapters/out/ClientPlanActions';
import { PlanDayInfo, ReduxStates } from 'src/shared/types/types';
import { useDispatch, useSelector } from 'react-redux';
import * as ClientPlanSlice from 'src/modules/clients/client-plans/adapters/in/slicers/ClientPlanSlice';
import { ClientPlanBody } from 'src/modules/clients/client-plans/adapters/out/clientPlan.types';
import PlanBucket from 'src/shared/components/PlanBucket/PlanBucket';
import CopyClientPlan from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/CopyClientPlan';

function ClientPlanBasicInformation({ client, plan }: { client: string; plan: PlanDayInfo }) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const planState = useSelector((state: ReduxStates) => state.clientPlans.clientPlans).find((_plan) => _plan._id === plan._id);
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();

  const { deleteClientPlan } = useClientPlan();
  const dispatch = useDispatch();

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

  const deletePlanHandler = () => {
    setOpenDialog(true);
    setMessage(ProgramMessages.REMOVE_PLAN);
    setAlert(true);
  };

  const openDialogHandler = () => {
    dispatch(ClientPlanSlice.acceptNewClientPlan(planState as ClientPlanBody));
    setOpenPlanDetailDialog(true);
  };
  return (
    <>
      {/* <div onClick={() => openDialogHandler()}>{plan.meals?.length} meals</div> */}
      <PlanBucket planDayInfo={plan} handler={openDialogHandler}>
        <CopyClientPlan plan={plan._id as unknown as string} />
      </PlanBucket>
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
