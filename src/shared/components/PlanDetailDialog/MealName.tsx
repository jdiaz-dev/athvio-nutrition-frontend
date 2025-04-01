import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeName } from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { Box, TextField } from '@mui/material';

const defaultName = 'Meal name';
function MealName({ name, componentTouched }: { name: string; componentTouched: boolean }) {
  const dispatch = useDispatch();
  const [_name, _setName] = useState(name);
  const [editMealTag, setEditMealTag] = useState(false);

  useEffect(() => {
    const renameMealTagHelper = () => {
      if (_name.length === 0) {
        dispatch(changeName(defaultName));
      } else {
        dispatch(changeName(_name));
      }
    };
    if (!editMealTag || !componentTouched) renameMealTagHelper();
  }, [editMealTag, componentTouched]);

  useEffect(() => {
    _setName(name);
  }, [name]);
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
            label="Name"
            autoComplete="off"
            value={_name}
            onChange={(e) => {
              _setName(e.target.value);
            }}
            onMouseLeave={() => {
              if (_name.length === 0) {
                _setName(defaultName);
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
          style={{
            height: '85%',
            paddingTop: '1.3%',
            borderBottom: '2px dashed',
            display: 'inline-block',
            alignItems: 'center',
          }}
          onClick={() => {
            setEditMealTag(true);
          }}
        >
          {_name}
        </div>
      )}
    </>
  );
}

export default MealName;
