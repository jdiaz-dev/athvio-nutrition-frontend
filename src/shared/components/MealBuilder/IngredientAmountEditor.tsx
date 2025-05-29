import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';

function IngredientAmountEditor({
  editAmount,
  isSavedNewAmount,
  setIsSavedNewAmount,
  name,
  amount,
  label,
}: {
  editAmount: boolean;
  isSavedNewAmount: boolean;
  setIsSavedNewAmount: Dispatch<SetStateAction<boolean>>;
  name: string;
  amount: string;
  label: string;
}) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const { updateAmountIngredient } = useMealBuilderSlicers(currentModuleContext.currentModule);
  const [newAmount, setNewAmount] = useState(parseInt(amount));
  const [valueChanged, setValueChanged] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAmount(parseInt(event.target.value));
    setValueChanged(true);
    setIsSavedNewAmount(false);
  };
  useEffect(() => {
    if (isSavedNewAmount) {
      dispatch(updateAmountIngredient({ name, newAmount: newAmount }));
      setValueChanged(false);
    }
  }, [isSavedNewAmount]);
  useEffect(() => {
    if (!editAmount) {
      setNewAmount(parseInt(amount));
    } else {
      inputRef.current?.focus();
    }
  }, [editAmount]);

  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      {editAmount ? (
        <TextField
          inputProps={{ style: { fontSize: 'revert', height: '25px' } }}
          InputLabelProps={{ style: { fontSize: 'revert' } }}
          style={{ width: '50%' }}
          id="standard-number"
          size="small"
          variant="standard"
          type="number"
          defaultValue={amount}
          inputRef={inputRef}
          value={valueChanged ? (editAmount ? newAmount : amount) : isSavedNewAmount ? amount : newAmount}
          onChange={handleChange}
        />
      ) : (
        <span>{`${amount}`}</span>
      )}
      <span style={{ marginLeft: '5px' }}>{`${label}`}</span>
    </Box>
  );
}

export default IngredientAmountEditor;
