import React, { useContext, useEffect, useState } from 'react';
import { Card, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';
import * as ProgramSlice from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import PatientList from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/PatientListToAssign';
import SelectedPatients from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/SelectedPatients';
import AssigmentStartDate from 'src/shared/components/AssigmentStartDate';
import StartDaySelector from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/StartDaySelector';
import { useAssignProgram } from 'src/modules/professionals/assign-program/out/AssignProgramActions';
import { MessagesForOkDialog } from 'src/shared/Consts';
import * as AssignProgramSlice from 'src/modules/professionals/assign-program/in/slicers/AssignProgramSlice';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import { Dayjs } from 'dayjs';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { useTranslation } from 'react-i18next';

function AssignProgramDialog({
  openAssignPogramDialog,
  setOpenAssignPogramDialog,
  _program,
}: {
  openAssignPogramDialog: boolean;
  setOpenAssignPogramDialog: (openProgram: boolean) => void;
  _program?: ProgramBody;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const programState = useSelector((state: ReduxStates) => state.programs.program.data);
  const assignProgramState = useSelector((state: ReduxStates) => state.assignProgram);
  const [closeIconDialog, setCloseIconDialog] = useState(true);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk } = useMessageDialog();
  const { assignProgram } = useAssignProgram();
  useEffect(() => {
    if (_program !== undefined) {
      dispatch(ProgramSlice.acceptNewProgram(_program));
    } else {
      dispatch(ProgramSlice.resetProgramItem());
    }
    return () => {
      dispatch(ProgramSlice.resetProgramItem());
    };
  }, [_program]);

  const closeDialogHandler = () => {
    setOpenAssignPogramDialog(false);
    dispatch(AssignProgramSlice.resetAssignmets());
  };
  const assignProgramHandler = async () => {
    await assignProgram({
      professional: programState.professional,
      program: programState._id,
      patients: assignProgramState.patients.map((patient) => patient._id),
      assignmentStartDate: assignProgramState.assignmentStartDate,
      startingDay: assignProgramState.startingDay,
    });
    setMessage(MessagesForOkDialog.PROGRAM_ASSIGNED);
    setOpenDialog(true);
    dispatch(AssignProgramSlice.resetAssignmets());
  };
  const datePickedHandler = (newDate: Dayjs | null) => {
    dispatch(AssignProgramSlice.assignStartDate(newDate?.toString() as string));
  };
  const closeIconDialogHandler = () => {
    setCloseIconDialog(false);
    dispatch(AssignProgramSlice.resetAssignmets());
  };
  useEffect(() => {
    if (!openDialog && messageOk) {
      setOpenAssignPogramDialog(false);
      reloadRecordListContext.setReloadRecordList(true);
      setMessageOk(false);
    }
  }, [openDialog, _program, messageOk]);

  useEffect(() => {
    if (!closeIconDialog) {
      reloadRecordListContext.setReloadRecordList(true);
      setOpenAssignPogramDialog(false);
    }
  }, [closeIconDialog]);

  return (
    <>
      <Dialog
        open={openAssignPogramDialog}
        onClose={closeDialogHandler}
        scroll="body"
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {t('programsModule.buttons.assignProgram')}
          <CloseDialogIcon closedIconDialog={closeIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent dividers={true} style={{ minHeight: '500px' }}>
          <Card
            style={{
              margin: '0 auto',
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div style={{ width: '70%' }}>
              <PatientList />
            </div>
            <div>
              <SelectedPatients />
              <AssigmentStartDate datePickedHandler={datePickedHandler} />
              <StartDaySelector />
            </div>
          </Card>
          <CancelAndSaveButtons cancelHandler={closeDialogHandler} saveHandler={assignProgramHandler} styles={{ width: '100%' }} />
        </DialogContent>
        {openDialog && (
          <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} />
        )}
      </Dialog>
    </>
  );
}

export default AssignProgramDialog;
