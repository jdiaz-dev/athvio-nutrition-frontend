import React, { useContext, useEffect, useState } from 'react';
import { Card, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as NutritionalMealDetailsSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { Box, Container, Grid } from '@mui/material';
import PlanCaloriesForm, {
  PatientPlanData,
} from 'src/modules/patients/patient-console/planifications/adapters/in/dialogs/PlanCaloriesForm';
import MacroForm, { MacroPercents } from 'src/modules/patients/patient-console/planifications/adapters/in/dialogs/MacroForm';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { formStyles } from 'src/shared/styles/styles';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import { PlanificationBody } from 'src/modules/patients/patient-console/planifications/helpers/planifications';

function CreateUpdatePlanificationDialog({
  openCreateUpdatePlanificationDialog,
  setOpenCreateUpdatePlanificationDialog,
  dialogTitle,
  planification,
}: {
  openCreateUpdatePlanificationDialog: boolean;
  setOpenCreateUpdatePlanificationDialog: (openDialog: boolean) => void;
  dialogTitle: string;
  planification?: PlanificationBody;
}) {
  const [plan, setPlan] = React.useState<PatientPlanData>({
    weightKg: undefined,
    heightM: undefined,
    age: undefined,
    sex: 'unspecified',
    activityFactor: 1.55,
    planCalories: 3000,
  });

  const [macros, setMacros] = React.useState<MacroPercents>({
    carbs: 25,
    protein: 50,
    fat: 25,
  });

  const authContext = useContext(AuthContext);

  const { classes } = formStyles();
  const dispatch = useDispatch();
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const nutritionalMealDetailsState = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMealDetails);
  const mealNameBasicInfo = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMealBasicInfo);
  const planificationsState = useSelector((state: ReduxStates) => state.planifications.planification);

  const { createNutritionalMeal, updateNutritionalMeal } = useNutritionalMeal();

  const [componentTouched, setComponentTouched] = useState(false);
  const [closedIconDialog, setClosedIconDialog] = useState(true);
  const [showAnticancerProperties, setShowAnticancerProperties] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);

  const createUpdatePlanificationHandler = async () => {};
  const closeIconDialogHandler = () => {
    if (componentTouched) {
      setComponentTouched(false);
    }
    setClosedIconDialog(false);
    setOpenCreateUpdatePlanificationDialog(false);
  };
  return (
    <Dialog
      open={openCreateUpdatePlanificationDialog}
      onClose={() => {
        setOpenCreateUpdatePlanificationDialog(false);
        dispatch(NutritionalMealDetailsSlice.reinitializeMeal());
      }}
      scroll="body"
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {dialogTitle}
        <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
      </DialogTitle>
      <DialogContent dividers={true}>
        <Card
          className={classes.card}
          style={{ padding: '20px', marginBottom: '15px' }}
          variant="outlined"
          onClick={() => {
            if (!componentTouched) {
              setComponentTouched(true);
            }
          }}
        >
          <Container maxWidth="lg" sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <PlanCaloriesForm
                  patientInformation={{
                    ...planificationsState.patientInformation,
                    calories: planificationsState.configuredMacros.calories,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MacroForm
                  initial={macros}
                  onChange={(v) => setMacros(v)}
                  showSubmitButton
                  onSubmit={(v) => {
                    // aquí puedes continuar al siguiente paso / guardar
                    console.log('Guardar', { plan, macros: v });
                  }}
                />
              </Grid>
            </Grid>
            <Box height={24} />
          </Container>
        </Card>
        <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={createUpdatePlanificationHandler} />
      </DialogContent>
    </Dialog>
  );
}
export default CreateUpdatePlanificationDialog;
