import React, { memo, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { useDispatch } from 'react-redux';
import { DialogTitle } from '@mui/material';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import MealDetail from 'src/shared/components/PlanDetailDialog/MealDetail';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { ReduxItemtatus } from 'src/shared/Consts';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { Subject } from 'rxjs';
import { generateTemporalId } from 'src/shared/helpers/functions';
import { useMealListSlicers } from 'src/shared/hooks/useMealListSlicers';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import { useMealsStates } from 'src/shared/components/PlanDetailDialog/useMealsStates';

const savedPlanButton = new Subject<boolean>();
export const savedPlanButton$ = savedPlanButton.asObservable();

const PlanDetailDialog = memo(function PlanDetailDialog({
  openPlanDetailDialog,
  setOpenPlanDetailDialog,
  planDay,
}: {
  openPlanDetailDialog: boolean;
  setOpenPlanDetailDialog: (openPlanDetailDialog: boolean) => void;
  planDay: string;
}) {
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const currentModuleContext = useContext(CurrentModuleContext);
  const dispatch = useDispatch();
  const { addMeal } = useMealListSlicers(currentModuleContext.currentModule);
  const { mealListState } = useMealsStates(currentModuleContext.currentModule);
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  useEffect(() => {
    if (!closedIconDialog) {
      reloadRecordListContext.setReloadRecordList(true);
      setOpenPlanDetailDialog(false);
    }
  }, [closedIconDialog]);

  const closeIconDialogHandler = () => {
    // reloadRecordListContext.setReloadRecordList(true);
    setOpenPlanDetailDialog(false);
  };
  const addMealPlanHandler = () => {
    dispatch(addMeal({ ...programInitialState.mealBasicInfo, ...programInitialState.mealDetails, _id: generateTemporalId() }));
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
        }}
        scroll="body"
        maxWidth="md"
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {planDay}
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent>
          {mealListState
            .filter((meal) => meal.status != ReduxItemtatus.DELETED)
            .map((meal, index) => (
              <MealDetail key={index} meal={meal} />
            ))}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={() => addMealPlanHandler()} size="large" style={{ width: '90%', marginBottom: '20px' }}>
              Add meal
            </Button>
          </div>

          <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={savePlanHandler} />
        </DialogContent>
      </Dialog>
    </>
  );
});

export default PlanDetailDialog;
