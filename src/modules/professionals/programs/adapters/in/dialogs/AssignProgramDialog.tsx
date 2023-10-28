import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
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
import { useSearcher } from 'src/shared/hooks/useSearcher';
import SearcherBar from 'src/shared/components/SearcherBar';

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
  const [closeIconDialog, setCloseIconDialog] = useState(true);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk } = useMessageDialog();
  const [createUpdateProgramStateUpdate, setCreateUpdateProgramStateUpdated] = useState(false);
  const { createProgram, updateProgram } = useProgram();

  const {
    searchWords,
    setSearchWords,
    matchedRecords,
    setMatchedRecords,
    choosedWord,
    setChoosedWord,
    recentlyTypedWord,
    setRecentlyTypedWord,
  } = useSearcher();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  useEffect(() => {
    const createUpdateProgramHelper = async () => {
      if (_program && _program._id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, professional, name, description, ...restProgram } = programState;
        await updateProgram({
          program: _id,
          professional,
          name,
          description,
        });
        setMessage('Program updated successfully');
        setCreateUpdateProgramStateUpdated(false);
        reset();
      } else {
        const { professional, name, description } = programState;
        await createProgram({ professional, name, description });
        setMessage('Program created successfully');
        setCreateUpdateProgramStateUpdated(false);
        reset();
      }
      setOpenDialog(true);
    };
    if (createUpdateProgramStateUpdate) {
      void createUpdateProgramHelper();
    }
    if (!openDialog && messageOk) {
      setOpenAssignPogramDialog(false);
      reloadRecordListContext.setReloadRecordList(true);
      setMessageOk(false);
    }
  }, [createUpdateProgramStateUpdate, openDialog, _program, messageOk]);

  const onSubmitProgram = (data: { name: string; description: string }) => {
    console.log(data);
    dispatch(ProgramSlice.setNameAndDescription(data));
    setCreateUpdateProgramStateUpdated(true);
  };

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
            <form className={classes.form} onSubmit={handleSubmit(onSubmitProgram as unknown as SubmitHandler<FieldValues>)}>
              <SearcherBar
                setSearchWords={setSearchWords}
                matchedRecords={matchedRecords}
                setChoosedWord={setChoosedWord}
                setRecentlyTypedWord={setRecentlyTypedWord}
              />

              <Button variant="contained" type="submit">
                Save
              </Button>
            </form>
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
