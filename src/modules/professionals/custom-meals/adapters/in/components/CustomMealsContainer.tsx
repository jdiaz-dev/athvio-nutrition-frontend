import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import CreateCustomMealDialog from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/CreateCustomMealDialog';
import SearcherBar from 'src/shared/components/SearcherBar';
import CustomMealList from 'src/modules/professionals/custom-meals/adapters/in/components/CustomMealList';

function CustomMealsContainer() {
  const [openCreateCustomMealDialog, setOpenCreateCustomMealDialog] = useState(false);
  const [reloadCustomMealList, setReloadCustomMealList] = useState(false);
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
        <SearcherBar />

        <Button variant="contained" onClick={() => setOpenCreateCustomMealDialog(true)}>
          Add custom meal
        </Button>
      </Stack>

      {/* <CustomMealList reloadCustomMealList={reloadCustomMealList} setReloadCustomMealList={setReloadCustomMealList} /> */}
      <CreateCustomMealDialog
        openCreateCustomMealDialog={openCreateCustomMealDialog}
        setOpenCreateCustomMealDialog={setOpenCreateCustomMealDialog}
        setReloadCustomMealList={setReloadCustomMealList}
      />

      <CustomMealList />
    </>
  );
}

export default CustomMealsContainer;
