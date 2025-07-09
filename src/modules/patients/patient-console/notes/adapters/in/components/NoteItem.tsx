import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { NoteBody } from 'src/modules/patients/patient-console/notes/helpers/notes';
import { useTranslation } from 'react-i18next';
import CreateUpdateNoteDialog from 'src/modules/patients/patient-console/notes/adapters/in/dialogs/CreateUpdateNoteDialog';
import { useNotes } from 'src/modules/patients/patient-console/notes/adapters/out/NoteActions';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import dayjs from 'dayjs';

function NoteItem({ note }: { note: NoteBody }) {
  const authContext = useContext(AuthContext);
  const { patientId } = useParams();

  const { t } = useTranslation();
  const [openCreateUpdateNoteDialog, setOpenCreateUpdateNoteDialog] = useState(false);
  const { deleteNote } = useNotes();
  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();

  useEffect(() => {
    const deleteNoteHelper = async () => {
      await deleteNote({ note: note.uuid, patient: patientId as string, professional: authContext.professional });
      setAlert(false);
    };
    if (alert && messageOk) {
      deleteNoteHelper();
    }
  }, [alert, messageOk]);

  const updateNoteHandler = () => {
    setOpenCreateUpdateNoteDialog(true);
  };
  const deleteNoteHandler = async () => {
    setAlert(true);
    setMessage(t('patientModule.messages.deleteNoteMessage'));
    setOpenDialog(true);
  };
  return (
    <Box sx={{ minWidth: 275, cursor: 'pointer', marginBottom: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
            {note.content}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{dayjs(note.date).format('YYYY-MM-DD HH:mm')}</div>
          <div>
            <Button variant="contained" style={{ marginRight: '20px', background: 'yellow', color: 'black' }} onClick={updateNoteHandler}>
              {t('global.buttons.edit')}
            </Button>
            <Button variant="contained" color="error" onClick={deleteNoteHandler}>
              {t('global.buttons.remove')}
            </Button>
          </div>
        </CardActions>
      </Card>
      {openCreateUpdateNoteDialog && (
        <CreateUpdateNoteDialog
          openCreateUpdateNoteDialog={openCreateUpdateNoteDialog}
          setOpenCreateUpdateNoteDialog={setOpenCreateUpdateNoteDialog}
          _note={note}
        />
      )}
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
    </Box>
  );
}

export default NoteItem;
