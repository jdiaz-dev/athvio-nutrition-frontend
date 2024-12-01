import React, { createContext, useState } from 'react';

import SignUpPatientDialog from 'src/modules/patients/patients/adapters/in/dialogs/SignUpPatientDialog';
import PatientGroupsContainer from 'src/modules/professionals/patient-groups/adapters/in/components/PatientGroupsContainer';
import { PatientGroup } from 'src/shared/types/types';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import PatientList from 'src/modules/patients/patients/adapters/in/components/PatientList';
import PatientStateTab from 'src/modules/patients/patients/adapters/in/components/PatientStateTab';
import { PatientStateContext } from 'src/modules/patients/patients/adapters/in/components/PatientStateContext';
import ModulesWrapper from 'src/shared/components/wrappers/ModulesWrapper';
import TitleAndButtonModule from 'src/shared/components/TitleAndButtonModule';

export const PatientGroupsContext = createContext<{
  patientGroupList: PatientGroup[];
  setPatientGroupList: React.Dispatch<React.SetStateAction<PatientGroup[]>>;
}>({ patientGroupList: [], setPatientGroupList: useState });

function PatientsContainer() {
  const [openCreatePatientDialog, setOpenCreatePatientDialog] = useState(false);
  const [patientGroupList, setPatientGroupList] = useState<PatientGroup[]>([]);
  const [indexState, setPatientIndexState] = useState(0);

  const { reloadRecordList, setReloadRecordList } = useReloadRecords();

  const buttonOnclikHandler = () => {
    setOpenCreatePatientDialog(true);
  };
  return (
    <>
      <ModulesWrapper>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <PatientGroupsContext.Provider value={{ patientGroupList, setPatientGroupList }}>
            <TitleAndButtonModule titleModule="Patients" buttonName="New patient" buttonHandler={buttonOnclikHandler} />
            <PatientStateContext.Provider value={{ indexState, setPatientIndexState }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PatientStateTab />
                <PatientGroupsContainer />
              </div>
              <PatientList />
            </PatientStateContext.Provider>
          </PatientGroupsContext.Provider>

          {openCreatePatientDialog && (
            <SignUpPatientDialog
              openCreatePatientDialog={openCreatePatientDialog}
              setOpenCreatePatientDialog={setOpenCreatePatientDialog}
            />
          )}
        </ReloadRecordListContext.Provider>
      </ModulesWrapper>
    </>
  );
}

export default PatientsContainer;
