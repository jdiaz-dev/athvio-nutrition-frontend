import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import { makeStyles } from 'tss-react/mui';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';

import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';
import { useProgram } from 'src/modules/professionals/programs/adapters/out/ProgramActions';
import * as ProgramSlice from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import ClientList from 'src/shared/components/ClientList/ClientList';
import { Modules } from 'src/shared/Consts';
import SelectClientButton from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/SelectClientButton';
import SelectedClients from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/SelectedClients';
import AssigmentStartDate from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/AssigmentStartDate';
import StartDaySelector from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/StartDaySelector';
import { useAssignProgram } from 'src/modules/professionals/assign-program/out/AssignProgramActions';

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      padding: '0px',
    },
    form: {
      width: '100%',
    },
    textField: {
      width: '90%',
      marginTop: '15px',
    },
    button: {
      'backgroundColor': 'blue',
      'width': '90%',
      'color': 'white',
      'height': '45px',
      'marginTop': '15px',
      'marginBottom': '15px',
      '&:hover': {
        backgroundColor: 'blue',
      },
    },
  };
});

function AssignProgramDialog({
  openAssignPogramDialog,
  setOpenAssignPogramDialog,
  _program,
}: {
  openAssignPogramDialog: boolean;
  setOpenAssignPogramDialog: (openProgram: boolean) => void;
  _program?: ProgramBody;
}) {
  const dispatch = useDispatch();
  const { classes } = cardStyles();
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const programState = useSelector((state: ReduxStates) => state.programs.program);
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

  const assignProgramHandler = async () => {
    await assignProgram({
      professional: programState.professional,
      program: programState._id,
      clients: assignProgramState.clients.map((client) => client._id),
      assignmentStartDate: assignProgramState.assignmentStartDate,
      startingDay: assignProgramState.startingDay,
    });
  };
  useEffect(() => {
    const createUpdateProgramHelper = async () => {
      if (_program && _program._id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, professional, name, description, ...restProgram } = programState;

        setMessage('Program updated successfully');
      } else {
        setMessage('Program created successfully');
      }
      setOpenDialog(true);
    };

    if (!openDialog && messageOk) {
      setOpenAssignPogramDialog(false);
      reloadRecordListContext.setReloadRecordList(true);
      setMessageOk(false);
    }
  }, [openDialog, _program, messageOk]);

  return (
    <>
      <Dialog
        open={openAssignPogramDialog}
        onClose={() => {
          setOpenAssignPogramDialog(false);
        }}
        scroll="paper"
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Assign program
          {closeIconDialog ? (
            <IconButton
              aria-label="close"
              onClick={() => {
                setCloseIconDialog(false);
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers={true} style={{ minHeight: '900px' }}>
          <Card className={classes.card} variant="outlined">
            <CurrentModuleContext.Provider value={{ currentModule: Modules.PROGRAMS }}>
              <ClientList Details={[SelectClientButton]} />
            </CurrentModuleContext.Provider>
            <SelectedClients />
            <AssigmentStartDate />
            <StartDaySelector />
            <Button variant="contained" type="submit" onClick={assignProgramHandler}>
              Save
            </Button>
          </Card>
        </DialogContent>
        {openDialog && (
          <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} />
        )}
      </Dialog>
    </>
  );
}

export default AssignProgramDialog;
