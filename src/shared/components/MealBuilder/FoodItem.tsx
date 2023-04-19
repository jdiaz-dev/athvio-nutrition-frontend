import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import { FoddAddedContext } from 'src/shared/components/MealBuilder/FoddAddedContext';
import { Food } from 'src/shared/components/MealBuilder/food.types';
import { useChooseSlicers } from 'src/shared/hooks/useChooseSlicers';

function FoodItem({ food }: { food: Food }) {
  const foddAddedContext = useContext(FoddAddedContext);
  const dispatch = useDispatch();

  const currentModuleContext = useContext(CurrentModuleContext);
  const { addIngredient } = useChooseSlicers(currentModuleContext.currentModule);
  const [_food, _setFood] = useState<Food>(food);
  useEffect(() => {
    _setFood(food);
  }, [food]);

  const calculateMacrosFixingDecimals = (amount: number, amountReference: number, macroReference: number) => {
    return (amount * 100 * (macroReference * 100)) / (amountReference * 10000);
  };
  return (
    <>
      <StyledTableRow key={_food.name}>
        <StyledTableCell style={{ padding: '3px', paddingLeft: '7px' }} align="right">
          <TextField
            inputProps={{ style: { fontSize: 'revert', height: '11px' } }}
            InputLabelProps={{ style: { fontSize: 'revert' } }}
            style={{ width: '100%' }}
            id="filled-hidden-label-small"
            label="(g)"
            variant="outlined"
            size="small"
            type="number"
            defaultValue={_food.defaultMeasure.amount}
            onChange={(e) => {
              const newAmount = Number(e.target.value);

              _setFood({
                ..._food,
                macros: {
                  protein: calculateMacrosFixingDecimals(newAmount, food.defaultMeasure.amount, food.macros.protein),
                  carbs: calculateMacrosFixingDecimals(newAmount, food.defaultMeasure.amount, food.macros.carbs),
                  fat: calculateMacrosFixingDecimals(newAmount, food.defaultMeasure.amount, food.macros.fat),
                  calories: calculateMacrosFixingDecimals(newAmount, food.defaultMeasure.amount, food.macros.calories),
                },
                defaultMeasure: { ..._food.defaultMeasure, amount: Number(e.target.value) },
              });
            }}
          />
        </StyledTableCell>
        <StyledTableCell style={{ padding: '4px' }} component="th" scope="row">
          {_food.name}
        </StyledTableCell>
        <StyledTableCell style={{ padding: '4px' }} component="th" scope="row">
          {_food.macros.protein}
        </StyledTableCell>
        <StyledTableCell style={{ padding: '4px' }} component="th" scope="row">
          {_food.macros.carbs}
        </StyledTableCell>
        <StyledTableCell style={{ padding: '4px' }} component="th" scope="row">
          {_food.macros.fat}
        </StyledTableCell>
        <StyledTableCell style={{ padding: '4px' }} component="th" scope="row">
          {_food.macros.calories}
        </StyledTableCell>
        <StyledTableCell align="right" style={{ padding: '0px', paddingRight: '7px' }}>
          <Button
            style={{ fontSize: '12px', height: '24px' }}
            size="small"
            variant="contained"
            onClick={() => {
              if (_food.defaultMeasure.amount > 0) {
                dispatch(
                  addIngredient({
                    amount: _food.defaultMeasure.amount,
                    name: _food.name,
                    unit: 'g',
                    protein: _food.macros.protein,
                    carbs: _food.macros.carbs,
                    fat: _food.macros.fat,
                    calories: _food.macros.calories,
                  }),
                );
                foddAddedContext.setFoodAdded(true);
              }
            }}
          >
            Add
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default FoodItem;
