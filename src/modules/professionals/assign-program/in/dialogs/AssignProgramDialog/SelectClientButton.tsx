import React, { useState } from 'react';
import { Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ClientToAssign } from 'src/modules/professionals/assign-program/out/AssignProgram.types';
import * as AssignProgramSlice from 'src/modules/professionals/assign-program/in/slicers/AssignProgramSlice';

function SelectClientButton({ client }: { client: ClientToAssign }) {
  const dispatch = useDispatch();
  const [assigned, setAssigned] = useState(false);
  const asssignCientHandler = () => {
    if (!assigned) {
      dispatch(AssignProgramSlice.assignNewClient(client));
      setAssigned(true);
    } else {
      dispatch(AssignProgramSlice.unassignClient(client));
      setAssigned(false);
    }
  };
  return (
    <>
      <Chip label="+" variant="outlined" onClick={asssignCientHandler} />
    </>
  );
}

export default SelectClientButton;
