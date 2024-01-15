import React, { useContext } from 'react';
import { ProfessionalIdContext } from 'src/App';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';
import CustomPasteIcon from 'src/shared/components/Icons/CustomPasteIcon';
import { useClientPlan } from 'src/modules/clients/client-plans/adapters/out/ClientPlanActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';

function DuplicateClientPlan({ client, assignedDate }: { client: string; assignedDate: Date }) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const clientPlanState = useSelector((state: ReduxStates) => state.clientPlans.clientPlan);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const { duplicateClientPlan } = useClientPlan();
  const duplicateClientPlanHandler = async () => {
    await duplicateClientPlan({
      professional: professionalIdContext.professional,
      client: client,
      clientPlan: clientPlanState._id,
      assignedDate: assignedDate,
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  return <CustomPasteIcon handler={duplicateClientPlanHandler} />;
}

export default DuplicateClientPlan;
