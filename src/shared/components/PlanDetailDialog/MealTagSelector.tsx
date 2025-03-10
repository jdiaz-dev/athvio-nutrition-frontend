import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { renameMealTag } from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { defaultMealTag } from 'src/shared/Consts';

const mealTagList = [defaultMealTag, 'Lunch', 'Dinner', 'First meal', 'Second meal', 'Third meal'];
function MealTagSelector({ mealTag }: { mealTag: string }) {
  const dispatch = useDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(renameMealTag(event.target.value));
  };

  return (
    <div style={{ width: '29%', marginRight: '10px' }}>
      {
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tag</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mealTag.length > 0 ? mealTag : mealTagList[0]}
            label="Database"
            onChange={handleChange}
          >
            {mealTagList.map((foodDatabase, index) => (
              <MenuItem key={index} value={foodDatabase}>
                {foodDatabase}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }
    </div>
  );
}

export default MealTagSelector;
