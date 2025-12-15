/* eslint-disable indent */
import React, { useState } from 'react';

import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { FoddAddedContext } from 'src/shared/components/MealBuilder/FoddAddedContext';
import IngredientItem from 'src/shared/components/MealBuilder/IngredientItem';
import { DisplayedIngredient, MealDataForBuilder } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { IngredientType } from 'src/shared/Consts';
import { useTranslation } from 'react-i18next';

const styleTableCell = {
  fontSize: 14,
  padding: '10px',
};

function IngredientList({ meal }: { meal: MealDataForBuilder }) {
  const { t } = useTranslation();
  const [foodAdded, setFoodAdded] = useState(false);
  return (
    <>
      <FoddAddedContext.Provider value={{ foodAdded, setFoodAdded }}>
        <TableContainer style={{ marginBottom: '6px' }} component={Paper}>
          <Table sx={{ minWidth: 350 }} size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={styleTableCell} align="left" width={'30%'}>
                  {t('mealBuilder.table.name')}
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="left" width={'60%'}>
                  {t('mealBuilder.table.food')}
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right" width={'7%'}>
                  {t('mealBuilder.table.proteins')}
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right" width={'7%'}>
                  {t('mealBuilder.table.carbs')}
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right" width={'7%'}>
                  {t('mealBuilder.table.fats')}
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right" width={'7%'}>
                  {t('mealBuilder.table.calories')}
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right" width={'7%'}></StyledTableCell>
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
                  <StyledTableCell align="right">{meal.macros.protein.toFixed(2)}</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.carbs.toFixed(2)}</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.fat.toFixed(2)}</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.calories.toFixed(2)}</StyledTableCell>
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
