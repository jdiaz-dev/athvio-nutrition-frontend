import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { formStyles } from 'src/shared/styles/styles';
import { useNotes } from 'src/modules/patients/patient-console/notes/adapters/out/NoteActions';
import { useParams } from 'react-router-dom';
import * as NotesSlice from 'src/modules/patients/patient-console/notes/adapters/in/slicers/NotesSlice';
import { NoteBody } from 'src/modules/patients/patient-console/notes/helpers/notes';
import { SnackbarProps } from 'src/shared/types/snackbar';
import { openSnackbar } from 'src/shared/components/Snackbar/snackbar';

function CreateUpdateNoteDialog({
  openCreateUpdateNoteDialog,
  setOpenCreateUpdateNoteDialog,
  _note,
}: {
  openCreateUpdateNoteDialog: boolean;
  setOpenCreateUpdateNoteDialog: (openNote: boolean) => void;
  _note?: NoteBody;
}) {
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const { classes } = formStyles();
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const { data: noteState, error } = useSelector((state: ReduxStates) => state.notes.note);
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk } = useMessageDialog();
  const [createUpdateNoteStateUpdate, setCreateUpdateNoteStateUpdated] = useState(false);
  const { createNote, updateNote } = useNotes();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (_note !== undefined) {
      dispatch(NotesSlice.acceptNewNote(_note));
    } else {
      dispatch(NotesSlice.resetNote());
    }
    return () => {
      dispatch(NotesSlice.resetNote());
    };
  }, [_note]);

  useEffect(() => {
    const createUpdateNoteHelper = async () => {
      if (_note && _note.uuid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { uuid, content } = noteState;
        await updateNote({
          note: uuid,
          professional: authContext.professional,
          patient: patientId as string,
          content,
        });
        setMessage('Note updated successfully');
        setCreateUpdateNoteStateUpdated(false);
        reset();
        setOpenCreateUpdateNoteDialog(false);
      } else {
        const { content, date } = noteState;
        await createNote({ professional: authContext.professional, patient: patientId as string, content, date });
        setMessage('Note created successfully');
        setCreateUpdateNoteStateUpdated(false);
        setOpenCreateUpdateNoteDialog(false);
        // reset();//todo: manage reset properly
      }
      setOpenDialog(true);
    };
    if (createUpdateNoteStateUpdate && patientId) {
      void createUpdateNoteHelper();
    }
    if (!openDialog && messageOk) {
      setOpenCreateUpdateNoteDialog(false);
      reloadRecordListContext.setReloadRecordList(true);
      setMessageOk(false);
    }
  }, [createUpdateNoteStateUpdate, openDialog, _note, messageOk]);

  useEffect(() => {
    if (error) {
      openSnackbar({
        open: true,
        message: error,
        variant: 'alert',
        alert: {
          color: 'error',
        },
      } as SnackbarProps);
    }
  }, [error]);

  const onSubmitNote = (data: { content: string; date: string }) => {
    dispatch(NotesSlice.modifyNote(data));
    setCreateUpdateNoteStateUpdated(true);
  };

  const closeIconDialogHandler = () => {
    setOpenCreateUpdateNoteDialog(false);
    setClosedIconDialog(false);
  };
  return (
    <>
      <Dialog
        open={openCreateUpdateNoteDialog}
        onClose={() => {
          setOpenCreateUpdateNoteDialog(false);
        }}
        scroll="body"
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-date"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Nota
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent dividers={true}>
          <Card className={classes.card} variant="outlined">
            <form className={classes.form} onSubmit={handleSubmit(onSubmitNote as any as SubmitHandler<FieldValues>)}>
              <TextField
                className={classes.textField}
                id="outlined-basic"
                variant="outlined"
                label="Name"
                type="text"
                defaultValue={noteState.date || new Date().toISOString()}
                {...register('date', {
                  required: 'Please enter a content for your program.',
                })}
                error={Boolean(errors.content)}
                helperText={errors.content?.message as ReactNode}
              />

              <TextField
                id="fullWidth"
                className={classes.textField}
                multiline
                label="Description"
                defaultValue={noteState.content}
                {...register('content', { required: false })}
                helperText={errors.content?.message as ReactNode}
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
    </>
  );
}

export default CreateUpdateNoteDialog;
