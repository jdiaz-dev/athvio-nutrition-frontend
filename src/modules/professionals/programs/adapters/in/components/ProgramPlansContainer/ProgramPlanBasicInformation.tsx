import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProfessionalIdContext } from 'src/App';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { ProgramMessages } from 'src/shared/Consts';
import { PlanDayInfo } from 'src/shared/types/types';

function ProgramPlanBasicInformation({ program, planDayInfo }: { program: string; planDayInfo: PlanDayInfo }) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();

  const { deletePlan } = usePlan();
  const deletePlanHandler = () => {
    setOpenDialog(true);
    setMessage(ProgramMessages.REMOVE_PLAN);
    setAlert(true);
  };
  useEffect(() => {
    const deletePlanHelper = async () => {
      await deletePlan({
        professional: professionalIdContext.professional,
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
      <div onClick={() => setOpenPlanDetailDialog(true)}>{planDayInfo.totalMeals} meals</div>
      {openPlanDetailDialog && (
        <PlanDetailDialog
          openPlanDetailDialog={openPlanDetailDialog}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
          domainOwnerId={program}
          planOwnerId={planDayInfo._id || ''}
        />
      )}
      <DeleteIcon onClick={deletePlanHandler} />
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
    </>
  );
}

export default ProgramPlanBasicInformation;
