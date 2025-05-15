import { AssignProgramInitialState } from 'src/modules/professionals/assign-program/out/AssignProgram.types';
import dayjs from 'dayjs';

export const assignProgramInitialState: AssignProgramInitialState = {
  professional: '',
  program: '',
  patients: [],
  assignmentStartDate: dayjs().toString(),
  startingDay: 1,
};
