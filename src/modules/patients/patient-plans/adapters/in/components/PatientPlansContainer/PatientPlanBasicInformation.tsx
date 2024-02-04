import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { ProgramMessages } from 'src/shared/Consts';
import { usePatientPlan } from 'src/modules/patients/patient-plans/adapters/out/PatientPlanActions';
import { PlanDayInfo, ReduxStates } from 'src/shared/types/types';
import { useDispatch, useSelector } from 'react-redux';
import * as PatientPlanSlice from 'src/modules/patients/patient-plans/adapters/in/slicers/PatientPlanSlice';
import { PatientPlanBody } from 'src/modules/patients/patient-plans/adapters/out/patientPlan.types';
import PlanBucket from 'src/shared/components/PlanBucket/PlanBucket';
import CopyPatientPlan from 'src/modules/patients/patient-plans/adapters/in/components/PatientPlansContainer/CopyPatientPlan';
import CustomTrashIcon from 'src/shared/components/Icons/CustomTrashIcon';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function PatientPlanBasicInformation({ patient, plan }: { patient: string; plan: PlanDayInfo }) {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const planState = useSelector((state: ReduxStates) => state.patientPlans.patientPlans).find((_plan) => _plan._id === plan._id);
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();

  const { deletePatientPlan } = usePatientPlan();
  const dispatch = useDispatch();

  useEffect(() => {
    const deletePlanHelper = async () => {
      await deletePatientPlan({
        professional: authContext.professional,
        patient,
        patientPlan: plan._id as string,
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
    dispatch(PatientPlanSlice.acceptNewPatientPlan(planState as PatientPlanBody));
    setOpenPlanDetailDialog(true);
  };
  return (
    <>
      {/* <div onClick={() => openDialogHandler()}>{plan.meals?.length} meals</div> */}
      <PlanBucket planDayInfo={plan} handler={openDialogHandler}>
        <CopyPatientPlan plan={plan._id as unknown as string} />
      </PlanBucket>
      {openPlanDetailDialog && (
        <PlanDetailDialog
          openPlanDetailDialog={openPlanDetailDialog}
          setOpenPlanDetailDialog={setOpenPlanDetailDialog}
          domainOwnerId={patient}
          planOwnerId={plan._id || ''}
        />
      )}
      <CustomTrashIcon handler={deletePlanHandler} />
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
    </>
  );
}

export default PatientPlanBasicInformation;
