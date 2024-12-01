import React, { useEffect, useState } from 'react';
import CustomRecipeList from 'src/modules/professionals/custom-recipes/adapters/in/components/CustomRecipeList';
// eslint-disable-next-line max-len
import CreateUpdateCustomRecipeDialog from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/CreateUpdateCustomRecipeDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import ModulesWrapper from 'src/shared/components/wrappers/ModulesWrapper';
import TitleAndButtonModule from 'src/shared/components/TitleAndButtonModule';

function CustomRecipesContainer() {
  const [openCreateUpdateCustomRecipeDialog, setOpenCreateUpdateCustomRecipeDialog] = useState(false);
  const [reloadCustomRecipeList, setReloadCustomRecipeList] = useState(false);
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  useEffect(() => {
    return () => {
      setReloadCustomRecipeList(false);
    };
  }, [reloadCustomRecipeList]);
  
  const buttonOnclikHandler = () => {
    setOpenCreateUpdateCustomRecipeDialog(true)
  }
  return (
    <>
      <ModulesWrapper>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
        <TitleAndButtonModule titleModule="Custom recipes" buttonName="New recipe" buttonHandler={buttonOnclikHandler} />
          <CustomRecipeList />
          {openCreateUpdateCustomRecipeDialog && (
            <CreateUpdateCustomRecipeDialog
              openCreateUpdateCustomRecipeDialog={openCreateUpdateCustomRecipeDialog}
              setOpenCreateUpdateCustomRecipeDialog={setOpenCreateUpdateCustomRecipeDialog}
            />
          )}
        </ReloadRecordListContext.Provider>
      </ModulesWrapper>
    </>
  );
}

export default CustomRecipesContainer;
