/* eslint-disable indent */
import React, { useState } from 'react';

import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { FoddAddedContext } from 'src/shared/components/MealBuilder/FoddAddedContext';
import IngredientItem from 'src/shared/components/MealBuilder/IngredientItem';
import { DisplayedIngredient, MealDataForBuilder } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { IngredientType } from 'src/shared/Consts';

const styleTableCell = {
  fontSize: 14,
  padding: '10px',
};

function IngredientList({ meal }: { meal: MealDataForBuilder }) {
  const [foodAdded, setFoodAdded] = useState(false);
  return (
    <>
      <FoddAddedContext.Provider value={{ foodAdded, setFoodAdded }}>
        <TableContainer style={{ marginBottom: '6px' }} component={Paper}>
          <Table sx={{ minWidth: 350 }} size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={styleTableCell} align="left" width={'16%'}>
                  Amount
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="left">
                  Food
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="left">
                  Protein
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="left">
                  Carbs
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="left">
                  Fat
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="left">
                  kcal
                </StyledTableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                {meal.ingredientDetails.map((ingredientDetail, index) => {
                  const displayedIngredient: DisplayedIngredient =
                    ingredientDetail.ingredientType == IngredientType.UNIQUE_INGREDIENT && ingredientDetail.ingredient
                      ? { ingredientType: IngredientType.UNIQUE_INGREDIENT, ...ingredientDetail.ingredient }
                      : ({
                          ingredientType: ingredientDetail.ingredientType,
                          amount: ingredientDetail.customIngredient?.amount,
                          label: ingredientDetail.customIngredient?.label,
                          name: ingredientDetail.customIngredient?.name,
                          ...ingredientDetail.customIngredient?.macros,
                        } as DisplayedIngredient);

                  return <IngredientItem key={index} displayedIngredient={displayedIngredient} />;
                })}
                <StyledTableRow>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">Total</StyledTableCell>
                  <StyledTableCell align="left">{meal.macros.protein}</StyledTableCell>
                  <StyledTableCell align="left">{meal.macros.carbs}</StyledTableCell>
                  <StyledTableCell align="left">{meal.macros.fat}</StyledTableCell>
                  <StyledTableCell align="left">{meal.macros.calories}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            }
          </Table>
        </TableContainer>
      </FoddAddedContext.Provider>
    </>
  );
}

export default IngredientList;
