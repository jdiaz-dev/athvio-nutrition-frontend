import React, { useEffect, useState } from 'react';
import NutritionalMealList from 'src/modules/professionals/nutritional-meals/adapters/in/components/NutritionalMealList';
// eslint-disable-next-line max-len
import CreateUpdateNutritionalMealDialog from 'src/modules/professionals/nutritional-meals/adapters/in/dialogs/CreateUpdateNutritionalMealDialog/CreateUpdateNutritionalMealDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import ModulesWrapper from 'src/shared/components/wrappers/ModulesWrapper';
import TitleAndButtonModule from 'src/shared/components/TitleAndButtonModule';
import { useTranslation } from 'react-i18next';

function NutritionalMealsContainer() {
  const { t } = useTranslation();

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
          <TitleAndButtonModule
            titleModule={t('mealsModule.titles.meals')}
            buttonName={t('mealsModule.buttons.createCustomMeal')}
            buttonHandler={buttonOnclikHandler}
          />
          <NutritionalMealList />
          {openCreateUpdateNutritionalMealDialog && (
            <CreateUpdateNutritionalMealDialog
              openCreateUpdateNutritionalMealDialog={openCreateUpdateNutritionalMealDialog}
              setOpenCreateUpdateNutritionalMealDialog={setOpenCreateUpdateNutritionalMealDialog}
              dialogTitle={t('mealsModule.buttons.createCustomMeal')}
            />
          )}
        </ReloadRecordListContext.Provider>
      </ModulesWrapper>
    </>
  );
}

export default NutritionalMealsContainer;
