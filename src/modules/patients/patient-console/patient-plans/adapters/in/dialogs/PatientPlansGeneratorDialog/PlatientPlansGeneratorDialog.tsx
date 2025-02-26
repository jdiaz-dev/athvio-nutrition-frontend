import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import ParameterList from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/ParameterList';
import { useNutritionBuilder } from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderActions';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { NutriBuilderParamStatus } from 'src/shared/Consts';
import AssigmentStartDate from 'src/shared/components/AssigmentStartDate';
import { Dayjs } from 'dayjs';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';

function PlatientPlansGeneratorDialog({
  openPlatientPlansGeneratorDialog,
  setOpenPlatientPlansGeneratorDialog,
}: {
  openPlatientPlansGeneratorDialog: boolean;
  setOpenPlatientPlansGeneratorDialog: (openDialog: boolean) => void;
}) {
  const nutritionBuilderState = useSelector((state: ReduxStates) => state.nutritionBuilder);
  const patientState = useSelector((state: ReduxStates) => state.patient);
  const { generateNutritionalPlanForPatient } = useNutritionBuilder();
  const [closedIconDialog, setClosedIconDialog] = useState(true);
  const [startDate, setStartDate] = useState<Dayjs>();

  const datePickedHandler = (newDate: Dayjs | null) => {
    setStartDate(newDate as Dayjs);
  };
  const closeIconDialogHandler = () => {
    setClosedIconDialog(false);
    setOpenPlatientPlansGeneratorDialog(false);
  };
  const saveButtonHandler = async () => {
    await generateNutritionalPlanForPatient({
      diseaseCauses: nutritionBuilderState.diseaseCauses
        .filter((item) => item.status === NutriBuilderParamStatus.SELECTED)
        .map((item) => item._id),
      diseases: nutritionBuilderState.diseases.filter((item) => item.status === NutriBuilderParamStatus.SELECTED).map((item) => item._id),
      nutritionalPreferences: nutritionBuilderState.nutritionalPreferences
        .filter((item) => item.status === NutriBuilderParamStatus.SELECTED)
        .map((item) => item._id),
      patient: patientState._id,
      startDate: startDate as Dayjs,
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
          Nutritional plan generator
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent dividers={true}>
          <AssigmentStartDate datePickedHandler={datePickedHandler} />
          <ParameterList />
          <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={saveButtonHandler} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PlatientPlansGeneratorDialog;
