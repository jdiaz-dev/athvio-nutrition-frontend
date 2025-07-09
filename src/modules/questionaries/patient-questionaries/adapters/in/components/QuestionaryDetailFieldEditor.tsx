import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import CheckAndCloseIcons from 'src/shared/components/Icons/CheckAndCloseIcons';

function QuestionaryDetailFieldEditor({
  questionaryDetail,
  fieldKey,
  fieldValue,
  placeHolder,
  sliceUpdater,
}: {
  questionaryDetail: string;
  fieldKey: string;
  fieldValue: string;
  placeHolder: string;
  sliceUpdater: ActionCreatorWithPayload<any>;
}) {
  const dispatch = useDispatch();
  const [editField, setEdtiField] = useState(false);
  const [newValue, setNewValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const editFieldHandler = () => {
    setEdtiField(true);
  };
  const cancerlEditFieldHandler = () => {
    setEdtiField(false);
  };
  const saveFieldHandler = () => {
    setEdtiField(false);
    dispatch(sliceUpdater({ uuid: questionaryDetail, [fieldKey]: newValue }));
  };
  useEffect(() => {
    if (editField) inputRef.current?.focus();
  }, [editField]);

  return (
    <Box width={'40%'}>
      {editField ? (
        <Box style={{ display: 'flex' }}>
          <TextField
            style={{ width: '88%' }}
            multiline
            placeholder={placeHolder}
            defaultValue={fieldValue}
            variant="standard"
            inputRef={inputRef}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <CheckAndCloseIcons checkHandler={saveFieldHandler} closeHandler={cancerlEditFieldHandler} styles={{ marginLeft: '8%' }} />
        </Box>
      ) : (
        <Box style={{ display: 'flex' }}>
          <Box style={{ width: '94%', border: '1px solid blue' }} onClick={editFieldHandler}>
            {fieldValue}
          </Box>
          <EditIcon width={'6%'} style={{ cursor: 'pointer' }} onClick={editFieldHandler} />
        </Box>
      )}
    </Box>
  );
}

export default QuestionaryDetailFieldEditor;
