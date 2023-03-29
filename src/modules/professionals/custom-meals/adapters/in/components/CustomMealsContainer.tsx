import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import SearcherBar from 'src/shared/components/SearcherBar';
import CustomMealList from 'src/modules/professionals/custom-meals/adapters/in/components/CustomMealList';
// eslint-disable-next-line max-len
import CreateUpdateCustomMealDialog from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/CreateUpdateCustomMealDialog';

function CustomMealsContainer() {
  const [openCreateUpdateCustomMealDialog, setOpenCreateUpdateCustomMealDialog] = useState(false);
  const [reloadCustomMealList, setReloadCustomMealList] = useState(false);
  console.log('--------container');
  useEffect(() => {
    return () => {
      setReloadCustomMealList(false);
    };
  }, [reloadCustomMealList]);
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
        <SearcherBar />
        <Button variant="contained" onClick={() => setOpenCreateUpdateCustomMealDialog(true)}>
          Add custom meal
        </Button>
      </Stack>
      {openCreateUpdateCustomMealDialog && (
        <CreateUpdateCustomMealDialog
          openCreateUpdateCustomMealDialog={openCreateUpdateCustomMealDialog}
          setOpenCreateUpdateCustomMealDialog={setOpenCreateUpdateCustomMealDialog}
          setReloadCustomMealList={setReloadCustomMealList}
        />
      )}
      <CustomMealList reloadCustomMealList={reloadCustomMealList} setReloadCustomMealList={setReloadCustomMealList} />
    </>
  );
}

export default CustomMealsContainer;
