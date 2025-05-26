import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

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

  const editFieldHandler = () => {
    setEdtiField(true);
  };
  const cancerlEditFieldHandler = () => {
    setEdtiField(false);
  };
  const saveFieldHandler = () => {
    setEdtiField(false);
    dispatch(sliceUpdater({ _id: questionaryDetail, [fieldKey]: newValue }));
  };
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
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Box width={'12%'} style={{ display: 'flex' }}>
            <CheckIcon style={{ cursor: 'pointer' }} onClick={saveFieldHandler} />
            <CloseIcon style={{ cursor: 'pointer' }} onClick={cancerlEditFieldHandler} />
          </Box>
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
