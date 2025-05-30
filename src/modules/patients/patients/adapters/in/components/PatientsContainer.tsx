import React, { createContext, useState } from 'react';

import SignUpPatientDialog from 'src/modules/patients/patients/adapters/in/dialogs/SignUpPatientDialog';
import PatientGroupsContainer from 'src/modules/professionals/patient-groups/adapters/in/components/PatientGroupsContainer';
import { PatientGroup } from 'src/shared/types/types';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import PatientList from 'src/modules/patients/patients/adapters/in/components/PatientList';
import PatientStateTab from 'src/modules/patients/patients/adapters/in/components/PatientStateTab';
import { PatientStateContext } from 'src/modules/patients/patients/adapters/in/components/PatientStateContext';
import GenericContainerWrapper from 'src/shared/components/wrappers/GenericContainerWrapper';
import TitleAndButtonModule from 'src/shared/components/TitleAndButtonModule';
import { useTranslation } from 'react-i18next';

export const PatientGroupsContext = createContext<{
  patientGroupList: PatientGroup[];
  setPatientGroupList: React.Dispatch<React.SetStateAction<PatientGroup[]>>;
}>({ patientGroupList: [], setPatientGroupList: useState });

function PatientsContainer() {
  const { t } = useTranslation();
  const [openCreatePatientDialog, setOpenCreatePatientDialog] = useState(false);
  const [patientGroupList, setPatientGroupList] = useState<PatientGroup[]>([]);
  const [indexState, setPatientIndexState] = useState(0);

  const { reloadRecordList, setReloadRecordList } = useReloadRecords();

  const buttonOnclikHandler = () => {
    setOpenCreatePatientDialog(true);
  };
  return (
    <>
      <GenericContainerWrapper>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <PatientGroupsContext.Provider value={{ patientGroupList, setPatientGroupList }}>
            <TitleAndButtonModule
              titleModule={t('patientModule.titles.patients')}
              buttonName={t('patientModule.buttons.newPatient')}
              buttonHandler={buttonOnclikHandler}
            />
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
      </GenericContainerWrapper>
    </>
  );
}

export default PatientsContainer;
