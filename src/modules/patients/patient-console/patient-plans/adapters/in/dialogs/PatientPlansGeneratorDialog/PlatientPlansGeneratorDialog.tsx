import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DiseaseParameterList from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/DiseaseParameterList';
import { useNutritionBuilder } from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderActions';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { MessagesForOkDialog, NutriBuilderParamStatus } from 'src/shared/Consts';
import { Dayjs } from 'dayjs';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import GeneralPatientPlanDefinition from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/GeneralPatientPlanDefinition';
import { useParams } from 'react-router-dom';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import MessageDialog from 'src/shared/dialogs/MessageDialog';

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
  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk } = useMessageDialog();
  const [validationErrors, setValidationErrors] = useState({
    startDate: '',
    totalDays: '',
    mealsByDay: '',
    calories: '',
    diseaseCauses: '',
    nutritionalPreferences: '',
    diseases: '',
  });

  useEffect(() => {
    if (!openDialog && messageOk) {
      setOpenPlatientPlansGeneratorDialog(false);
      setMessageOk(false);
    }
  }, [openDialog, messageOk]);

  const datePickedHandler = (newDate: Dayjs | null) => {
    setStartDate(newDate as Dayjs);
    if (newDate) {
      setValidationErrors((prev) => ({ ...prev, startDate: '' }));
    }
  };

  const closeIconDialogHandler = () => {
    setClosedIconDialog(false);
    setOpenPlatientPlansGeneratorDialog(false);
    resetValidationErrors();
  };

  const resetValidationErrors = () => {
    setValidationErrors({
      startDate: '',
      totalDays: '',
      mealsByDay: '',
      calories: '',
      diseaseCauses: '',
      nutritionalPreferences: '',
      diseases: '',
    });
  };

  const validateForm = (): boolean => {
    const errors = {
      startDate: '',
      totalDays: '',
      mealsByDay: '',
      calories: '',
      diseaseCauses: '',
      nutritionalPreferences: '',
      diseases: '',
    };

    let isValid = true;

    // Validate start date
    if (!startDate) {
      errors.startDate = 'Debe seleccionar una fecha de inicio';
      isValid = false;
    }

    // Validate total days (must not be higher than 7)
    if (!nutritionBuilderState.totalDays || nutritionBuilderState.totalDays <= 0) {
      errors.totalDays = 'Días totales debe ser mayor que 0';
      isValid = false;
    } else if (nutritionBuilderState.totalDays > 7) {
      errors.totalDays = 'Días totales no puede ser mayor que 7';
      isValid = false;
    }

    // Validate meals by day (must be higher than 3)
    if (!nutritionBuilderState.mealsByDay || nutritionBuilderState.mealsByDay >= 4) {
      errors.mealsByDay = 'Solo se permite un máximo de 3 comidas por día';
      isValid = false;
    }

    // Validate calories (must not be higher than 10000)
    if (!nutritionBuilderState.macros?.calories || nutritionBuilderState.macros.calories <= 0) {
      errors.calories = 'Calorías debe ser mayor que 0';
      isValid = false;
    } else if (nutritionBuilderState.macros.calories > 10000) {
      errors.calories = 'Calorías no puede ser mayor que 10000';
      isValid = false;
    }

    // Validate disease causes (at least one must be selected)
    const hasSelectedDiseaseCause = nutritionBuilderState.diseaseCauses.some((item) => item.status === NutriBuilderParamStatus.SELECTED);
    if (!hasSelectedDiseaseCause) {
      errors.diseaseCauses = 'Debe seleccionar al menos una causa raíz de la enfermedad';
      isValid = false;
    }

    // Validate nutritional preferences (at least one must be selected)
    const hasSelectedNutritionalPreference = nutritionBuilderState.nutritionalPreferences.some(
      (item) => item.status === NutriBuilderParamStatus.SELECTED,
    );
    if (!hasSelectedNutritionalPreference) {
      errors.nutritionalPreferences = 'Debe seleccionar al menos una preferencia nutricional';
      isValid = false;
    }

    // Validate diseases (at least one must be selected)
    const hasSelectedDisease = nutritionBuilderState.diseases.some((item) => item.status === NutriBuilderParamStatus.SELECTED);
    if (!hasSelectedDisease) {
      errors.diseases = 'Debe seleccionar al menos una enfermedad';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const saveButtonHandler = () => {
    if (!validateForm()) {
      return;
    }

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
    setMessage(MessagesForOkDialog.GENERATING_PATIENT_PLANS);
    setOpenDialog(true);
    resetValidationErrors();
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
          <GeneralPatientPlanDefinition
            setStartDate={setStartDate}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />
          <DiseaseParameterList validationErrors={validationErrors} setValidationErrors={setValidationErrors} />
          <CancelAndSaveButtons
            cancelHandler={closeIconDialogHandler}
            saveHandler={saveButtonHandler}
            customSaveNameButton="Generar plan"
          />
          {openDialog && (
            <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PlatientPlansGeneratorDialog;
