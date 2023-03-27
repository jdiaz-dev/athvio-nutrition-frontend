import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Box, Button, Card, Dialog, DialogContent, TextField, Typography } from '@mui/material';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { makeStyles } from 'tss-react/mui';

import IngredientList from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/IngredientList';
import NutrientsDetail from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/NutrientsDetail';
import Recipe from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/Recipe';
import { ProfessionalIdContext } from 'src/App';
import { updateCustomMealName } from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomMeal } from 'src/modules/professionals/custom-meals/adapters/out/CustomMealActions';
import { ReduxStates } from 'src/shared/types';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      padding: '0px',
    },
    form: {
      width: '100%',
    },
    textField: {
      width: '90%',
      marginTop: '15px',
    },
    button: {
      'backgroundColor': 'blue',
      'width': '90%',
      'color': 'white',
      'height': '45px',
      'marginTop': '15px',
      'marginBottom': '15px',
      '&:hover': {
        backgroundColor: 'blue',
      },
    },
  };
});

function CreateCustomMealDialog({
  openCreateCustomMealDialog,
  setOpenCreateCustomMealDialog,
  setReloadCustomMealList,
}: {
  openCreateCustomMealDialog: boolean;
  setOpenCreateCustomMealDialog: (openDialog: boolean) => void;
  setReloadCustomMealList: (openDialog: boolean) => void;
}) {
  const { classes } = cardStyles();

  const dispatch = useDispatch();
  const customMeal = useSelector((state: ReduxStates) => state.customMeal);
  const { createCustomMeal } = useCustomMeal();

  const professionalIdContext = useContext(ProfessionalIdContext);

  // const [createClientHandler] = useMutation<CreateClientResponse, CreateClientRequest>(CREATE_CLIENT);

  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const [customMealNameUpdated, setCustomMealNameUpdated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const [openMessageClientDialog, setOpenMessageClientDialog] = useState(false);

  useEffect(() => {
    if (customMealNameUpdated) void createCustomMeal(customMeal);
  }, [customMealNameUpdated]);
  const handleAccordion = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };
  const onSubmitCustomMeal = (data: { name: string }) => {
    dispatch(updateCustomMealName(data.name));
    setCustomMealNameUpdated(true);
  };

  return (
    <>
      <Dialog
        open={openCreateCustomMealDialog}
        onClose={() => setOpenCreateCustomMealDialog(false)}
        scroll="paper"
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent dividers={true} style={{ minHeight: '900px' }}>
          <Card className={classes.card} variant="outlined">
            {/* <CustomMealName /> */}

            <form
              className={classes.form}
              onSubmit={handleSubmit(onSubmitCustomMeal as any as SubmitHandler<FieldValues>)}
            >
              <Box
                sx={{
                  maxWidth: '100%',
                  marginBottom: '10px',
                }}
              >
                <TextField
                  fullWidth
                  id="fullWidth"
                  label="Custom meal name"
                  {...register('name', { required: 'Please enter a name for your custom meal.' })}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message as ReactNode}
                />
              </Box>

              <IngredientList />

              <Accordion expanded={panelExpanded === 'panel1'} onChange={handleAccordion('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>Show micronutrients detail</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <NutrientsDetail />
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={panelExpanded === 'panel2'} onChange={handleAccordion('panel2')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>Add recipe</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Recipe />
                </AccordionDetails>
              </Accordion>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateCustomMealDialog;
