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
  sliceUpdater,
}: {
  questionaryDetail: string;
  fieldKey: string;
  fieldValue: string;
  sliceUpdater: ActionCreatorWithPayload<any>;
}) {
  const dispatch = useDispatch();
  const [editField, setEdtiField] = useState(false);
  const [newValue, setNewValue] = useState('');

  const editFieldHandler = () => {
    setEdtiField(true);
  };
  const saveFieldHandler = () => {
    setEdtiField(false);
    dispatch(sliceUpdater({ _id: questionaryDetail, [fieldKey]: newValue }));
  };
  return (
    <Box width={'40%'}>
      {editField ? (
        <Box style={{ display: 'flex', border: '1px solid pink' }}>
          <TextField
            style={{ width: '88%' }}
            multiline
            placeholder="Respuesta del paciente..."
            value={fieldValue}
            variant="standard"
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Box width={'12%'} style={{ display: 'flex' }}>
            <CheckIcon onClick={saveFieldHandler} />
            <CloseIcon onClick={editFieldHandler} />
          </Box>
        </Box>
      ) : (
        <Box style={{ display: 'flex' }}>
          <Box style={{ width: '94%', border: '1px solid blue' }}>{fieldValue}</Box>
          <EditIcon width={'6%'} onClick={editFieldHandler} />
        </Box>
      )}
    </Box>
  );
}

export default QuestionaryDetailFieldEditor;
