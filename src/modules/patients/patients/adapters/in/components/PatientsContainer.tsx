import React, { createContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import SignUpPatientDialog from 'src/modules/patients/patients/adapters/in/dialogs/SignUpPatientDialog';
import PatientGroupsContainer from 'src/modules/professionals/patient-groups/adapters/in/components/PatientGroupsContainer';
import { PatientGroup } from 'src/shared/types/types';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import PatientList from 'src/modules/patients/patients/adapters/in/components/PatientList';
import PatientStateTab from 'src/modules/patients/patients/adapters/in/components/PatientStateTab';
import { PatientStateContext } from 'src/modules/patients/patients/adapters/in/components/PatientStateContext';

export const PatientGroupsContext = createContext<{
  patientGroupList: PatientGroup[];
  setPatientGroupList: React.Dispatch<React.SetStateAction<PatientGroup[]>>;
}>({ patientGroupList: [], setPatientGroupList: useState });

function PatientsContainer() {
  const [openCreatePatientDialog, setOpenCreatePatientDialog] = useState(false);
  const [patientGroupList, setPatientGroupList] = useState<PatientGroup[]>([]);
  const [indexState, setPatientIndexState] = useState(0);

  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  return (
    <>
      <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
        <PatientGroupsContext.Provider value={{ patientGroupList, setPatientGroupList }}>
          <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
            <Button variant="contained" onClick={() => setOpenCreatePatientDialog(true)}>
              Add patient
            </Button>
            <PatientGroupsContainer />
          </Stack>
          <PatientStateContext.Provider value={{ indexState, setPatientIndexState }}>
            <PatientStateTab />
            <PatientList />
          </PatientStateContext.Provider>
        </PatientGroupsContext.Provider>

        {openCreatePatientDialog && (
          <SignUpPatientDialog openCreatePatientDialog={openCreatePatientDialog} setOpenCreatePatientDialog={setOpenCreatePatientDialog} />
        )}
      </ReloadRecordListContext.Provider>
    </>
  );
}

export default PatientsContainer;
