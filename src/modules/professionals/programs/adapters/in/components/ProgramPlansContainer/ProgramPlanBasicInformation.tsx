import React, { useContext, useEffect, useState } from 'react';
import PlanDetailDialog from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from 'tss-react/mui';
import { ProfessionalIdContext } from 'src/App';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { ProgramMessages } from 'src/shared/Consts';
import { PlanDayInfo } from 'src/shared/types/types';
import { ListItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PanToolIcon from '@mui/icons-material/PanTool';
import { hoverIcon, programItemContainer, programItemWrapper } from 'src/shared/styles/styles';

const buttonStyles = makeStyles()(() => {
  return {
    container: { ...programItemContainer, margin: 0 },
    wrapper: {
      ...programItemWrapper,
      ...hoverIcon,
    },
    trash: {
      ...hoverIcon,
      marginLeft: '80%',
      marginBottom: '2px',
    },
    icon: {
      width: '45%',
      marginRight: '3px',
    },
    numberMealsContainer: {
      display: 'flex',
    },
  };
});
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
  const { classes } = buttonStyles();

  return (
    <>
      <div draggable className={classes.container}>
        <div onClick={() => setOpenPlanDetailDialog(true)}>
          <div className={classes.numberMealsContainer}>
            <div style={{ width: '70%' }}>{planDayInfo.meals?.length} meals</div>
            <div style={{ width: '30%' }}>
              <ContentCopyIcon className={classes.icon} />
              <PanToolIcon className={classes.icon} />
            </div>
          </div>
          <ul>
            {planDayInfo.meals?.map((meal, index) => (
              <ListItem key={index}>{meal.name}</ListItem>
            ))}
          </ul>
        </div>
      </div>
      <DeleteIcon className={classes.trash} onClick={deletePlanHandler} />
      {openPlanDetailDialog && (
        <PlanDetailDialog
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

export default ProgramPlanBasicInformation;
