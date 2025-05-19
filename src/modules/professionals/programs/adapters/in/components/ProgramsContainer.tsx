import React, { useEffect, useState } from 'react';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import ProgramList from 'src/modules/professionals/programs/adapters/in/components/ProgramList';
import CreateUpdateProgramDialog from 'src/modules/professionals/programs/adapters/in/dialogs/CreateUpdateProgramDialog';
import GenericContainerWrapper from 'src/shared/components/wrappers/GenericContainerWrapper';
import TitleAndButtonModule from 'src/shared/components/TitleAndButtonModule';
import { useTranslation } from 'react-i18next';

function ProgramsContainer() {
  const { t } = useTranslation();
  const [openCreateUpdateProgramDialog, setOpenCreateUpdateProgramDialog] = useState(false);
  const [reloadProgramList, setReloadProgramList] = useState(false);
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();

  useEffect(() => {
    return () => {
      setReloadProgramList(false);
    };
  }, [reloadProgramList]);

  const buttonOnclikHandler = () => {
    setOpenCreateUpdateProgramDialog(true);
  };
  return (
    <>
      <GenericContainerWrapper>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <TitleAndButtonModule
            titleModule={t('programsModule.table.name')}
            buttonName={t('programsModule.buttons.createNewProgram')}
            buttonHandler={buttonOnclikHandler}
          />
          <ProgramList />
          {openCreateUpdateProgramDialog && (
            <CreateUpdateProgramDialog
              openCreateUpdateProgramDialog={openCreateUpdateProgramDialog}
              setOpenCreateUpdateProgramDialog={setOpenCreateUpdateProgramDialog}
            />
          )}
        </ReloadRecordListContext.Provider>
      </GenericContainerWrapper>
    </>
  );
}

export default ProgramsContainer;
