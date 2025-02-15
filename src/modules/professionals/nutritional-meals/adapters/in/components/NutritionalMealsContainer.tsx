import React, { useEffect, useState } from 'react';
import NutritionalMealList from 'src/modules/professionals/nutritional-meals/adapters/in/components/NutritionalMealList';
// eslint-disable-next-line max-len
import CreateUpdateNutritionalMealDialog from 'src/modules/professionals/nutritional-meals/adapters/in/dialogs/CreateUpdateNutritionalMealDialog/CreateUpdateNutritionalMealDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import ModulesWrapper from 'src/shared/components/wrappers/ModulesWrapper';
import TitleAndButtonModule from 'src/shared/components/TitleAndButtonModule';

function NutritionalMealsContainer() {
  const [openCreateUpdateNutritionalMealDialog, setOpenCreateUpdateNutritionalMealDialog] = useState(false);
  const [reloadNutritionalMealList, setReloadNutritionalMealList] = useState(false);
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  useEffect(() => {
    return () => {
      setReloadNutritionalMealList(false);
    };
  }, [reloadNutritionalMealList]);

  const buttonOnclikHandler = () => {
    setOpenCreateUpdateNutritionalMealDialog(true);
  };
  return (
    <>
      <ModulesWrapper>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <TitleAndButtonModule titleModule="Meals" buttonName="New meal" buttonHandler={buttonOnclikHandler} />
          <NutritionalMealList />
          {openCreateUpdateNutritionalMealDialog && (
            <CreateUpdateNutritionalMealDialog
              openCreateUpdateNutritionalMealDialog={openCreateUpdateNutritionalMealDialog}
              setOpenCreateUpdateNutritionalMealDialog={setOpenCreateUpdateNutritionalMealDialog}
            />
          )}
        </ReloadRecordListContext.Provider>
      </ModulesWrapper>
    </>
  );
}

export default NutritionalMealsContainer;
