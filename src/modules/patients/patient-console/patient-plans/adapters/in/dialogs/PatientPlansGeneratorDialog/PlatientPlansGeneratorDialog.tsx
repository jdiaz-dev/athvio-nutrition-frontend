import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import ParameterList from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/ParameterList';
import { useNutritionBuilder } from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderActions';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { NutriBuilderParamStatus } from 'src/shared/Consts';
import AssigmentStartDate from 'src/shared/components/AssigmentStartDate';
import { Dayjs } from 'dayjs';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import PatientMacros from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/PatientMacros';
import * as nutritionBuilderSlice from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';
import { useParams } from 'react-router-dom';

function PlatientPlansGeneratorDialog({
  openPlatientPlansGeneratorDialog,
  setOpenPlatientPlansGeneratorDialog,
}: {
  openPlatientPlansGeneratorDialog: boolean;
  setOpenPlatientPlansGeneratorDialog: (openDialog: boolean) => void;
}) {
  const nutritionBuilderState = useSelector((state: ReduxStates) => state.nutritionBuilder);
  const { generateNutritionalPlanForPatient } = useNutritionBuilder();
  const [closedIconDialog, setClosedIconDialog] = useState(true);
  const [startDate, setStartDate] = useState<Dayjs>();
  const { patientId } = useParams();

  const datePickedHandler = (newDate: Dayjs | null) => {
    setStartDate(newDate as Dayjs);
  };
  const closeIconDialogHandler = () => {
    setClosedIconDialog(false);
    setOpenPlatientPlansGeneratorDialog(false);
  };
  const saveButtonHandler = () => {
    generateNutritionalPlanForPatient({
      diseaseCauses: nutritionBuilderState.diseaseCauses
        .filter((item) => item.status === NutriBuilderParamStatus.SELECTED)
        .map((item) => item.uuid),
      diseases: nutritionBuilderState.diseases.filter((item) => item.status === NutriBuilderParamStatus.SELECTED).map((item) => item.uuid),
      nutritionalPreferences: nutritionBuilderState.nutritionalPreferences
        .filter((item) => item.status === NutriBuilderParamStatus.SELECTED)
        .map((item) => item.uuid),
      patient: patientId as string,
      startDate: startDate as Dayjs,
      totalDays: nutritionBuilderState.totalDays,
      mealsByDay: nutritionBuilderState.mealsByDay,
      macros: nutritionBuilderState.macros,
    });
    setOpenPlatientPlansGeneratorDialog(false);
  };
  return (
    <>
      <Dialog
        open={openPlatientPlansGeneratorDialog}
        onClose={() => setOpenPlatientPlansGeneratorDialog(false)}
        scroll="body"
        fullWidth={true}
        maxWidth="lg"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Generator del plan nutritional
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent dividers={true}>
          <div style={{ display: 'flex' }}>
            <AssigmentStartDate datePickedHandler={datePickedHandler} />
            <div style={{ width: '55%', display: 'flex', paddingTop: '2.5%', justifyContent: 'space-around' }}>
              <TextField
                id="outlined-number"
                label="Total days"
                type="number"
                value={nutritionBuilderState.totalDays}
                onChange={(event) => nutritionBuilderSlice.updateTotalDays(parseInt(event.target.value))}
              />
              <TextField
                id="outlined-number"
                label="Meals by day"
                type="number"
                value={nutritionBuilderState.mealsByDay}
                onChange={(event) => nutritionBuilderSlice.updateMealsByDay(parseInt(event.target.value))}
              />
              <PatientMacros />
            </div>
          </div>
          <ParameterList />
          <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={saveButtonHandler} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PlatientPlansGeneratorDialog;
