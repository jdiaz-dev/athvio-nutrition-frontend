import React, { createContext, useState } from 'react';

import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBody from '@mui/material/TableBody';

import FoodList from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/FoodList';
import Ingredient from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/Ingredient';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { MealDataForBuilder } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';

const styleTableCell = {
  fontSize: 14,
  padding: '10px',
};
export const FoddAddedContext = createContext<{
  foodAdded: boolean;
  setFoodAdded: React.Dispatch<React.SetStateAction<boolean>>;
}>({ foodAdded: false, setFoodAdded: useState });

function IngredientList({ meal }: { meal: MealDataForBuilder }) {
  const [foodAdded, setFoodAdded] = useState(false);

  return (
    <>
      <FoddAddedContext.Provider value={{ foodAdded, setFoodAdded }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={styleTableCell} width={'16%'}>
                  Amount (g){' '}
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Food
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Protein&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Carbs&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Fat&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Calories&nbsp;(kcal)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                {meal.ingredients.map((ingredient, index) => (
                  <Ingredient key={index} ingredient={ingredient} />
                ))}
                <StyledTableRow key={meal.name}>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">Total</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.protein}</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.fat}</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.calories}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            }
          </Table>
        </TableContainer>
        <FoodList />
      </FoddAddedContext.Provider>
    </>
  );
}

export default IngredientList;
