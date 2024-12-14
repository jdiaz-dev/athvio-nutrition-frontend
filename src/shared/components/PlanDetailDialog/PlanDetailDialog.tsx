import React, { memo, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { DialogTitle } from '@mui/material';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MealDetail from 'src/shared/components/PlanDetailDialog/MealDetail';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules, ReduxItemtatus } from 'src/shared/Consts';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { PlanDialogContext, defaultPlanDay } from 'src/shared/context/PlanDialogContext';
import { Subject } from 'rxjs';
import * as MealsListSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealsListSlice';
import { generateTemporalId } from 'src/shared/helpers/functions';

const savedPlanButton = new Subject<boolean>();
export const savedPlanButton$ = savedPlanButton.asObservable();

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
  const planDialogContext = useContext(PlanDialogContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const currentModuleContext = useContext(CurrentModuleContext);
  const dispatch = useDispatch();

  const mealsState = useSelector((state: ReduxStates) => state.programs.meals);
  const [closedIconDialog, setClosedIconDialog] = useState(true);

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
    savedPlanButton.next(true);
    setOpenPlanDetailDialog(false);
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
            mealsState
              .filter((meal) => meal.status != ReduxItemtatus.DELETED)
              .map((meal, index) => (
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
