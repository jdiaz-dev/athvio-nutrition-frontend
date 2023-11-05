import { AssignProgramInitialState } from 'src/modules/professionals/assign-program/out/AssignProgram.types';

export const assignProgramInitialState: AssignProgramInitialState = {
  professional: '',
  program: '',
  clients: [],
  assignmentStartDate: new Date(),
  startingDay: 0,
};
