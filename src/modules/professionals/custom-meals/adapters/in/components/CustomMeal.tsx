import React from 'react';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';

function CustomMeal() {
  return (
    <>
      <StyledTableRow key={ingredient.ingredientName}>
        <StyledTableCell align="right">{ingredient.amount}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {ingredient.ingredientName}
        </StyledTableCell>
        <StyledTableCell align="right">{ingredient.protein}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.carbs}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.fat}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.calories}</StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default CustomMeal;
