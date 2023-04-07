import React, { ReactNode, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from 'tss-react/mui';
import IngredientList from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/IngredientList';
// eslint-disable-next-line max-len
import CookingInstructions from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/CookingInstructions';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { renameCustomRecipeName } from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';

const cardStyles = makeStyles()(() => {
  return {
    form: {
      width: '100%',
    },
  };
});

// VERY IMPORTANT: this component is used (shared) in custom-recipes, program and client-plan modules
function MealConstructor({ setMealNameUpdated }: { setMealNameUpdated: (mealNameUpdated: boolean) => void }) {
  const { classes } = cardStyles();
  const dispatch = useDispatch();
  const customRecipe = useSelector((state: ReduxStates) => state.customRecipes.customRecipe);

  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAccordion = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };
  const onSubmitCustomRecipe = (data: { name: string }) => {
    dispatch(renameCustomRecipeName(data.name));
    setMealNameUpdated(true);
  };
  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmitCustomRecipe as any as SubmitHandler<FieldValues>)}>
        <Box
          sx={{
            maxWidth: '100%',
            marginBottom: '10px',
          }}
        >
          <TextField
            fullWidth
            id="fullWidth"
            label="Custom Recipe name"
            defaultValue={customRecipe.name}
            {...register('name', { required: 'Please enter a name for your custom Recipe.' })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message as ReactNode}
          />
        </Box>

        <IngredientList />

        <Accordion expanded={panelExpanded === 'panel1'} onChange={handleAccordion('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: '38px' }} aria-controls="panel1d-content" id="panel1d-header">
            <Typography variant="subtitle1">Add instructions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CookingInstructions />
          </AccordionDetails>
        </Accordion>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}

export default MealConstructor;
