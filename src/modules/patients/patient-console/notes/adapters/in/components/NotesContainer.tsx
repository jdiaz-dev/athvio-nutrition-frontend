import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NoteList from 'src/modules/patients/patient-console/notes/adapters/in/components/NoteList';
import CreateUpdateNoteDialog from 'src/modules/patients/patient-console/notes/adapters/in/dialogs/CreateUpdateNoteDialog';
import TitleAndButtonModule from 'src/shared/components/TitleAndButtonModule';
import GenericContainerWrapper from 'src/shared/components/wrappers/GenericContainerWrapper';

function NotesContainer() {
  const { t } = useTranslation();
  const [openCreateUpdateNoteDialog, setOpenCreateUpdateNoteDialog] = useState(false);

  const createNoteHandler = () => {
    setOpenCreateUpdateNoteDialog(true);
  };
  return (
    <>
      <GenericContainerWrapper>
        <TitleAndButtonModule
          titleModule={t('patientModule.titles.clinicalNotes')}
          buttonName={t('patientModule.buttons.newNote')}
          buttonHandler={createNoteHandler}
        />
        <NoteList />
        {openCreateUpdateNoteDialog && (
          <CreateUpdateNoteDialog
            openCreateUpdateNoteDialog={openCreateUpdateNoteDialog}
            setOpenCreateUpdateNoteDialog={setOpenCreateUpdateNoteDialog}
          />
        )}
      </GenericContainerWrapper>
    </>
  );
}

export default NotesContainer;
