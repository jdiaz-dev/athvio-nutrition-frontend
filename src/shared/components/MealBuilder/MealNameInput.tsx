import { Box, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import { useChooseSlicers } from 'src/shared/hooks/useChooseSlicers';

function MealNameInput({ recipeName }: { recipeName: string }) {
  const dispatch = useDispatch();
  const currentModuleContext = useContext(CurrentModuleContext);
  const [_recipeName, _setRecipeName] = useState(recipeName);
  const [isInputBlur, setIsInputBlur] = useState(false);
  const { renameMealName } = useChooseSlicers(currentModuleContext.currentModule);

  useEffect(() => {
    if (isInputBlur) {
      if (_recipeName.length === 0) {
        dispatch(renameMealName(recipeName));
      } else {
        dispatch(renameMealName(_recipeName));
      }
      setIsInputBlur(false);
    }
  }, [isInputBlur, recipeName]);
  return (
    <div>
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
          onMouseLeave={() => {
            if (_recipeName.length === 0) _setRecipeName(recipeName);
            setIsInputBlur(true);
          }}
        />
      </Box>
    </div>
  );
}

export default MealNameInput;
