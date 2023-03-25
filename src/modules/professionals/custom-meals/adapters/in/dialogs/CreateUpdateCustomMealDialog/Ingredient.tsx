import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { IngredientType } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import {
  EDAMAN_ANALISIS_APP_KEY,
  EDAMAN_ANALISIS_NUTRITION_DATA,
  EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID,
} from 'src/shared/Consts';
import { AnalisysNutritionDataResponse } from 'src/modules/professionals/custom-meals/adapters/out/Edaman.types';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Ingredient(ingredient: IngredientType) {
  useEffect(() => {
    const getCountries = () => {
      fetch(
        // eslint-disable-next-line max-len
        `${EDAMAN_ANALISIS_NUTRITION_DATA}?app_id=${EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID}&app_key=${EDAMAN_ANALISIS_APP_KEY}&nutrition-type=cooking&ingr=${ingredient.amount}g ${ingredient.ingredientName}`,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((nutritionData: AnalisysNutritionDataResponse) => {
          console.log('-------nutritionData', nutritionData);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ingredient.protein = nutritionData.totalNutrients.PROCNT.quantity;
          ingredient.carbs = nutritionData.totalNutrients.CHOCDF.quantity;
          ingredient.fat = nutritionData.totalNutrients.FAT.quantity;
          console.log('-------ingredient', ingredient);
        })
        .catch((error) => console.log('-----error', error));
    };
    getCountries();
  }, []);

  return (
    <>
      <StyledTableRow key={ingredient.ingredientName}>
        <StyledTableCell align="right">{ingredient.amount}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {ingredient.ingredientName}
        </StyledTableCell>
        <StyledTableCell align="right">{ingredient.fat}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.carbs}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.protein}</StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default Ingredient;
