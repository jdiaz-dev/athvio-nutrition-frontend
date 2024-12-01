import React, { useEffect, useState } from 'react';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import ProgramList from 'src/modules/professionals/programs/adapters/in/components/ProgramList';
import CreateUpdateProgramDialog from 'src/modules/professionals/programs/adapters/in/dialogs/CreateUpdateProgramDialog';
import ModulesWrapper from 'src/shared/components/wrappers/ModulesWrapper';
import TitleAndButtonModule from 'src/shared/components/TitleAndButtonModule';

function ProgramsContainer() {
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
      <ModulesWrapper>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <TitleAndButtonModule titleModule="Programs" buttonName="New program" buttonHandler={buttonOnclikHandler} />
          <ProgramList />
          {openCreateUpdateProgramDialog && (
            <CreateUpdateProgramDialog
              openCreateUpdateProgramDialog={openCreateUpdateProgramDialog}
              setOpenCreateUpdateProgramDialog={setOpenCreateUpdateProgramDialog}
            />
          )}
        </ReloadRecordListContext.Provider>
      </ModulesWrapper>
    </>
  );
}

export default ProgramsContainer;
