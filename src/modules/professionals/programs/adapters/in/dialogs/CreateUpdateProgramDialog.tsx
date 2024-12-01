import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';
import { useProgram } from 'src/modules/professionals/programs/adapters/out/ProgramActions';
import * as ProgramSlice from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import SnackbarMesssage from 'src/shared/components/SnackbarMessage';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { formStyles } from 'src/shared/styles/styles';

function CreateUpdateProgramDialog({
  openCreateUpdateProgramDialog,
  setOpenCreateUpdateProgramDialog,
  _program,
}: {
  openCreateUpdateProgramDialog: boolean;
  setOpenCreateUpdateProgramDialog: (openProgram: boolean) => void;
  _program?: ProgramBody;
}) {
  const dispatch = useDispatch();
  const { classes } = formStyles();
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const { data: programState, error } = useSelector((state: ReduxStates) => state.programs.program);
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk } = useMessageDialog();
  const [createUpdateProgramStateUpdate, setCreateUpdateProgramStateUpdated] = useState(false);
  const { createProgram, updateProgram } = useProgram();
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
        const { _id, professional, name, description, ..._restProgram } = programState;
        await updateProgram({
          program: _id,
          professional: authContext.professional,
          name,
          description,
        });
        setMessage('Program updated successfully');
        setCreateUpdateProgramStateUpdated(false);
        reset();
        setOpenCreateUpdateProgramDialog(false);
      } else {
        const { professional, name, description } = programState;
        await createProgram({ professional: authContext.professional, name, description });
        setMessage('Program created successfully');
        setCreateUpdateProgramStateUpdated(false);
        setOpenCreateUpdateProgramDialog(false);
        // reset();//todo: manage reset properly
      }
      setOpenDialog(true);
    };
    if (createUpdateProgramStateUpdate) {
      void createUpdateProgramHelper();
    }
    if (!openDialog && messageOk) {
      setOpenCreateUpdateProgramDialog(false);
      reloadRecordListContext.setReloadRecordList(true);
      setMessageOk(false);
    }
  }, [createUpdateProgramStateUpdate, openDialog, _program, messageOk]);

  const onSubmitProgram = (data: { name: string; description: string }) => {
    console.log(data);
    dispatch(ProgramSlice.setNameAndDescription(data));
    setCreateUpdateProgramStateUpdated(true);
  };

  const closeIconDialogHandler = () => {
    setOpenCreateUpdateProgramDialog(false);
    setClosedIconDialog(false);
  };
  return (
    <>
      <Dialog
        open={openCreateUpdateProgramDialog}
        onClose={() => {
          setOpenCreateUpdateProgramDialog(false);
        }}
        scroll="paper"
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Create your program
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent dividers={true}>
          <Card className={classes.card} variant="outlined">
            <form className={classes.form} onSubmit={handleSubmit(onSubmitProgram as any as SubmitHandler<FieldValues>)}>
              <TextField
                className={classes.textField}
                id="outlined-basic"
                variant="outlined"
                label="Name"
                type="text"
                defaultValue={programState.name}
                {...register('name', {
                  required: 'Please enter a name for your program.',
                })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message as ReactNode}
              />

              <TextField
                className={classes.textField}
                id="fullWidth"
                label="Description"
                defaultValue={programState.description}
                {...register('description', { required: false })}
              />

              <Button className={classes.button} variant="contained" type="submit">
                Save
              </Button>
            </form>
          </Card>
        </DialogContent>
        {/* {openDialog && (
          <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} />
        )} */}
      </Dialog>
      {error && <SnackbarMesssage message={error} messageCleaner={ProgramSlice.programErrorCleaner} />}
    </>
  );
}

export default CreateUpdateProgramDialog;
