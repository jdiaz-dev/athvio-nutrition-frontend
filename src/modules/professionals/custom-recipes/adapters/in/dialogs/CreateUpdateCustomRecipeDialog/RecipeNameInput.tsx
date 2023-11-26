import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as CustomRecipeBasicInfoSlice from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeBasicInfo';
import { defaultRecipeName } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';

function RecipeNameInput({ recipeName, parentComponentTouched }: { recipeName: string; parentComponentTouched: boolean }) {
  const dispatch = useDispatch();
  const [_recipeName, _setRecipeName] = useState(recipeName);
  const [isInputBlur, setIsInputBlur] = useState(false);

  useEffect(() => {
    if (isInputBlur) {
      if (_recipeName.length === 0) {
        dispatch(CustomRecipeBasicInfoSlice.renameRecipeName(recipeName));
      } else {
        dispatch(CustomRecipeBasicInfoSlice.renameRecipeName(_recipeName));
      }
      setIsInputBlur(false);
    }

    return () => {
      if (!parentComponentTouched && !isInputBlur) {
        dispatch(CustomRecipeBasicInfoSlice.renameRecipeName(defaultRecipeName));
      }
    };
  }, [isInputBlur, recipeName]);

  const mouseLeaveHandler = () => {
    if (_recipeName.length === 0) {
      _setRecipeName(recipeName);
    }
    setIsInputBlur(true);
  };
  return (
    <>
      <Box
        sx={{
          maxWidth: '100%',
          marginBottom: '10px',
        }}
      >
        <TextField
          fullWidth
          id="fullWidth"
          label="Custom Recipe name"
          autoComplete="off"
          value={_recipeName}
          onChange={(e) => _setRecipeName(e.target.value)}
          onMouseLeave={mouseLeaveHandler}
        />
      </Box>
    </>
  );
}

export default RecipeNameInput;
