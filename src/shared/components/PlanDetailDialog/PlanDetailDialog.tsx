import React, { memo, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { DialogTitle } from '@mui/material';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import MealDetail from 'src/shared/components/PlanDetailDialog/MealDetail';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { PlanDialogContext, defaultPlanDay } from 'src/shared/context/PlanDialogContext';
import { AssigmentForProgram, MealsForProgram, usePlanAdapter } from 'src/shared/hooks/usePlanAdater';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { Subject } from 'rxjs';
import * as MealsListSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealsListSlice';
import { generateTemporalId } from 'src/shared/helpers/functions';

const mealPlanCreatedChange = new Subject<boolean>();
export const mealPlanCreatedChange$ = mealPlanCreatedChange.asObservable();

const PlanDetailDialog = memo(function PlanDetailDialog({
  openPlanDetailDialog,
  setOpenPlanDetailDialog,
  domainOwnerId,
  planOwnerId,
  planDay,
}: {
  openPlanDetailDialog: boolean;
  setOpenPlanDetailDialog: (openPlanDetailDialog: boolean) => void;
  domainOwnerId: string;
  planOwnerId?: string;
  planDay: number;
}) {
  const authContext = useContext(AuthContext);
  const planDialogContext = useContext(PlanDialogContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const currentModuleContext = useContext(CurrentModuleContext);
  const dispatch = useDispatch();

  const planState =
    currentModuleContext.currentModule === Modules.PROGRAMS
      ? useSelector((state: ReduxStates) => state.programs.plans).find((_plan) => _plan._id === planOwnerId)
      : useSelector((state: ReduxStates) => state.patientPlans.patientPlan);

  const mealss = useSelector((state: ReduxStates) => state.programs.meals);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [closedIconDialog, setClosedIconDialog] = useState(true);
  const { createPlan } = usePlanAdapter(currentModuleContext.currentModule);

  useEffect(() => {
    setMeals(planState?.meals || []);
  }, [planState]);

  useEffect(() => {
    if (!closedIconDialog) {
      reloadRecordListContext.setReloadRecordList(true);
      setOpenPlanDetailDialog(false);
    }
  }, [closedIconDialog]);

  const closeIconDialogHandler = () => {
    reloadRecordListContext.setReloadRecordList(true);
    setOpenPlanDetailDialog(false);
    planDialogContext.setPlanDay(defaultPlanDay);
  };
  const addMealPlanHandler = () => {
    dispatch(
      MealsListSlice.addMeal({ ...programInitialState.mealBasicInfo, ...programInitialState.mealDetails, _id: generateTemporalId() }),
    );
  };

  const savePlanHandler = async () => {
    /* if (currentModuleContext.currentModule === Modules.PROGRAMS) {
      await createPlan<AssigmentForProgram, MealsForProgram>({
        professional: authContext.professional,
        entityOwnerOfMealsId: domainOwnerId as string,
        assigmentOfMeals: {
          week: 1,
          day: 1,
        },
        bodyWithMeals: {
          meals: meals,
          title: 'title',
        },
      });
    } */
    mealPlanCreatedChange.next(true);
  };
  return (
    <>
      <Dialog
        open={openPlanDetailDialog}
        onClose={() => {
          setOpenPlanDetailDialog(false);
          planDialogContext.setPlanDay(defaultPlanDay);
        }}
        scroll="body"
        maxWidth="md"
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Day {planDay}
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent>
          {domainOwnerId &&
            mealss.map((meal, index) => (
              <MealDetail key={index} domainOwnerId={domainOwnerId} planOwnerId={planOwnerId as string} meal={meal} planDay={planDay} />
            ))}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => addMealPlanHandler()}
              size="large"
              style={{ marginTop: '-15px', width: '90%', marginBottom: '20px' }}
            >
              Add meal
            </Button>
          </div>

          <div style={{ width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'right' }}>
            <Button variant="contained" style={{ marginRight: '20px', background: 'yellow', color: 'black' }}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={savePlanHandler}>
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default PlanDetailDialog;
