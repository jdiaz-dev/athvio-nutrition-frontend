import { useSelector } from 'react-redux';
import { Modules } from 'src/shared/Consts';
import { ReduxStates } from 'src/shared/types/types';

export const useMealsStates = (module: Modules) => {
  const mealListState =
    module === Modules.PROGRAMS
      ? useSelector((state: ReduxStates) => state.programs.mealList)
      : useSelector((state: ReduxStates) => state.patientPlans.mealList);

  const mealBasicInfoState =
    module === Modules.PROGRAMS
      ? useSelector((state: ReduxStates) => state.programs.mealBasicInfo)
      : useSelector((state: ReduxStates) => state.patientPlans.mealBasicInfo);

  const mealDetailsState =
    module === Modules.PROGRAMS
      ? useSelector((state: ReduxStates) => state.programs.mealDetails)
      : useSelector((state: ReduxStates) => state.patientPlans.mealDetails);

  return { mealListState, mealBasicInfoState, mealDetailsState };
};
