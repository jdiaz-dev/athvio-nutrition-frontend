import React, { useEffect } from 'react';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNotes } from 'src/modules/patients/patient-console/notes/adapters/out/NoteActions';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import NoteItem from 'src/modules/patients/patient-console/notes/adapters/in/components/NoteItem';

function NoteList() {
  const authContext = React.useContext(AuthContext);
  const { data: noteListState } = useSelector((state: ReduxStates) => state.notes.notes);

  const { patientId } = useParams();
  const { getNotes } = useNotes();

  useEffect(() => {
    const fetchNotes = async () => {
      if (patientId) {
        await getNotes({
          patient: patientId,
          professional: authContext.professional,
        });
      }
    };
    fetchNotes();
  }, [patientId]);

  return (
    <div>
      {noteListState.map((note, index) => (
        <NoteItem key={index} note={note} />
      ))}
    </div>
  );
}

export default NoteList;
