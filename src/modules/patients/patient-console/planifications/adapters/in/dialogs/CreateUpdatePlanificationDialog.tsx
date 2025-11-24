import React, { useEffect, useState } from 'react';
import { Card, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as NutritionalMealDetailsSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import PlanCaloriesForm from 'src/modules/patients/patient-console/planifications/adapters/in/dialogs/PlanCaloriesForm';
import MacroForm from 'src/modules/patients/patient-console/planifications/adapters/in/dialogs/MacroForm';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { formStyles } from 'src/shared/styles/styles';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import { PlanificationBody } from 'src/modules/patients/patient-console/planifications/helpers/planifications';
import * as PlanificationSlice from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationSlice';
import { usePlanification } from 'src/modules/patients/patient-console/planifications/adapters/out/PlanificationActions';
import { useParams } from 'react-router-dom';
import { ReduxStates } from 'src/shared/types/types';
import FormulaSelector from 'src/modules/backoffice/formulas/adapters/in/components/FormulaSelector';
import { FormulaGroup } from 'src/modules/backoffice/formulas/types/formula';

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
  const { patientId } = useParams();
  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification) as PlanificationBody;

  const { createPlanification, updatePlanification } = usePlanification();
  const [selectedFormulaGroup, setSelectedFormulaGroup] = useState<FormulaGroup | null>(null);

  const { classes } = formStyles();
  const dispatch = useDispatch();

  const [componentTouched, setComponentTouched] = useState(false);
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  useEffect(() => {
    if (planification) {
      dispatch(PlanificationSlice.initializePlanification(planification));
    } else {
      dispatch(PlanificationSlice.resetPlanification());
    }
    return () => {
      dispatch(PlanificationSlice.resetPlanification());
    };
  }, [planification]);

  const createUpdatePlanificationHandler = async () => {
    if (planificationState.uuid.length === 0) {
      await createPlanification({
        patient: patientId as string,
        patientInformation: planificationState.patientInformation,
        configuredMacros: planificationState.configuredMacros,
      });
    } else {
      await updatePlanification({
        planification: planificationState.uuid,
        patient: patientId as string,
        patientInformation: planificationState.patientInformation,
        configuredMacros: planificationState.configuredMacros,
      });
    }
    setOpenCreateUpdatePlanificationDialog(false);
  };
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
                <FormulaSelector setSelectedFormulaGroup={setSelectedFormulaGroup} />
                {selectedFormulaGroup !== null && <PlanCaloriesForm selectedFormulaGroup={selectedFormulaGroup} />}
              </Grid>
              <Grid item xs={12} md={6}>
                <MacroForm />
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
