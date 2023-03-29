import React, { useState } from 'react';
// eslint-disable-next-line max-len
import CreateUpdateCustomMealDialog from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/CreateUpdateCustomMealDialog';
import { CustomMealBody } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';

function CustomMeal(customMeal: CustomMealBody) {
  const [openCreateUpdateCustomMealDialog, setOpenCreateUpdateCustomMealDialog] = useState(false);
  const [reloadCustomMealList, setReloadCustomMealList] = useState(false);
  return (
    <>
      <StyledTableRow
        key={customMeal.name}
        style={{ border: '2px solid red' }}
        onClick={() => setOpenCreateUpdateCustomMealDialog(true)}
      >
        <StyledTableCell align="right">{customMeal.name}</StyledTableCell>
        {/* <StyledTableCell component="th" scope="row">
          {ingredient.ingredientName}
        </StyledTableCell>
        <StyledTableCell align="right">{ingredient.protein}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.carbs}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.fat}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.calories}</StyledTableCell> */}
      </StyledTableRow>
      <CreateUpdateCustomMealDialog
        openCreateUpdateCustomMealDialog={openCreateUpdateCustomMealDialog}
        setOpenCreateUpdateCustomMealDialog={setOpenCreateUpdateCustomMealDialog}
        setReloadCustomMealList={setReloadCustomMealList}
        _customMeal={customMeal}
      />
    </>
  );
}

export default CustomMeal;
