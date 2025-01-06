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
            id="outlined-basic"
            label="Meal Tag"
            autoComplete="off"
            value={_mealTag}
            onChange={(e) => {
              const word = e.target.value;
              const firstLetter = word.charAt(0);
              const firstLetterCap = firstLetter.toUpperCase();
              const remainingLetters = word.slice(1);
              const capitalizedWord = firstLetterCap + remainingLetters;

              _setMealTag(capitalizedWord);
            }}
            onMouseLeave={() => {
              if (_mealTag.length === 0) {
                _setMealTag(defaultMealTag);
              }
              setEditMealTag(false);
            }}
            onClick={() => {
              setEditMealTag(true);
            }}
          />
        </Box>
      ) : (
        <div
          style={{ borderBottom: '2px dashed', display: 'inline-block' }}
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
