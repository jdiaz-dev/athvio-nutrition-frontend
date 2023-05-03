/* eslint-disable indent */
import React, { useState } from 'react';

import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import FoodList from 'src/shared/components/MealBuilder/FoodList';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { FoddAddedContext } from 'src/shared/components/MealBuilder/FoddAddedContext';
import IngredientItem from 'src/shared/components/MealBuilder/IngredientItem';
import { EndIngredient, MealDataForBuilder } from 'src/shared/components/MealBuilder/MealBuilder.types';
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={styleTableCell} width={'16%'}>
                  Amount
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
                {meal.ingredientDetails.map((ingredientDetail, index) => {
                  const endIngredient: EndIngredient =
                    ingredientDetail.ingredientType == IngredientType.UNIQUE_INGREDIENT && ingredientDetail.ingredient
                      ? ingredientDetail.ingredient
                      : ({
                          amount: ingredientDetail.customIngredient?.amount,
                          label: ingredientDetail.customIngredient?.label,
                          name: ingredientDetail.customIngredient?.name,
                          ...ingredientDetail.customIngredient?.macros,
                        } as EndIngredient);

                  return <IngredientItem key={index} endIngredient={endIngredient} />;
                })}
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

/*
  export interface Macros {
  weightInGrams: number;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Ingredient extends Macros {
  amount: number;
  name: string;
  label: string;
}
export type EndIngredient = Ingredient;
interface CustomIngredient {
  name: string;
  ingredients: Ingredient[];
  macros: Macros;
}

interface Equivalent {
  ingredientType: IngredientType;
  customIngredient?: CustomIngredient;
  ingredient?: Ingredient;
}

interface IngredientDetail extends Equivalent {
  equivalents: Equivalent[];
}

*/
