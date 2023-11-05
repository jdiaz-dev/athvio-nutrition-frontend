import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { renameMealTag } from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { Box, TextField } from '@mui/material';
import { defaultMealTag } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';

function MealTag({ mealTag, componentTouched }: { mealTag: string; componentTouched: boolean }) {
  const dispatch = useDispatch();
  const [_mealTag, _setMealTag] = useState(mealTag);
  const [editMealTag, setEditMealTag] = useState(false);

  useEffect(() => {
    _setMealTag(mealTag);
  }, [mealTag]);

  useEffect(() => {
    const renameMealTagHelper = () => {
      if (_mealTag.length === 0) {
        dispatch(renameMealTag(defaultMealTag));
      } else {
        dispatch(renameMealTag(_mealTag));
      }
    };
    if (!editMealTag || !componentTouched) renameMealTagHelper();
  }, [editMealTag, componentTouched]);

  return (
    <>
      {editMealTag ? (
        <Box
          sx={{
            maxWidth: '100%',
            marginBottom: '10px',
          }}
        >
          <TextField
            fullWidth
            id="fullWidth"
            label="Meal Tag"
            autoComplete="off"
            value={_mealTag}
            onChange={(e) => {
              _setMealTag(e.target.value);
            }}
            onMouseLeave={() => {
              if (_mealTag.length === 0) _setMealTag(defaultMealTag);
              setEditMealTag(false);
            }}
            onClick={() => {
              setEditMealTag(true);
            }}
          />
        </Box>
      ) : (
        <div
          onClick={() => {
            setEditMealTag(true);
          }}
        >
          {_mealTag}
        </div>
      )}
    </>
  );
}

export default MealTag;
