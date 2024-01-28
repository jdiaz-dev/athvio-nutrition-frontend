import React, { useState } from 'react';
import { Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { PatientToAssign } from 'src/modules/professionals/assign-program/out/AssignProgram.types';
import * as AssignProgramSlice from 'src/modules/professionals/assign-program/in/slicers/AssignProgramSlice';

function SelectPatientButton({ patient }: { patient: PatientToAssign }) {
  const dispatch = useDispatch();
  const [assigned, setAssigned] = useState(false);

  const asssignCientHandler = () => {
    if (!assigned) {
      dispatch(AssignProgramSlice.assignNewPatient(patient));
      setAssigned(true);
    } else {
      dispatch(AssignProgramSlice.unassignPatient(patient));
      setAssigned(false);
    }
  };

  return (
    <>
      <Chip label="+" variant="outlined" onClick={asssignCientHandler} />
    </>
  );
}

export default SelectPatientButton;
