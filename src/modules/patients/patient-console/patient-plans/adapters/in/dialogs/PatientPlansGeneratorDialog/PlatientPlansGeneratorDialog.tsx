import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import ParameterList from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/ParameterList';
import { useNutritionBuilder } from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderActions';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { NutriBuilderParamStatus } from 'src/shared/Consts';

function PlatientPlansGeneratorDialog({
  openPlatientPlansGeneratorDialog,
  setOpenPlatientPlansGeneratorDialog,
}: {
  openPlatientPlansGeneratorDialog: boolean;
  setOpenPlatientPlansGeneratorDialog: (openDialog: boolean) => void;
}) {
  const nutritionBuilderState = useSelector((state: ReduxStates) => state.nutritionBuilder);
  const { buildNutritionalPlan } = useNutritionBuilder();

  const handler = () => {
    buildNutritionalPlan({
      diseaseCauses: nutritionBuilderState.diseaseCauses
        .filter((item) => item.status === NutriBuilderParamStatus.SELECTED)
        .map((item) => item._id),
      diseases: nutritionBuilderState.diseases.filter((item) => item.status === NutriBuilderParamStatus.SELECTED).map((item) => item._id),
      nutritionalPreferences: nutritionBuilderState.nutritionalPreferences
        .filter((item) => item.status === NutriBuilderParamStatus.SELECTED)
        .map((item) => item._id),
    });
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
          {/* {closeIconDialog ? (
            <IconButton
              aria-label="close"
              onClick={() => {
                setCloseIconDialog(false);
                dispatch(AssignProgramSlice.resetAssignmets());
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null} */}
        </DialogTitle>
        <DialogContent dividers={true}>
          <ParameterList />
          <Button onClick={handler}>Build</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PlatientPlansGeneratorDialog;
