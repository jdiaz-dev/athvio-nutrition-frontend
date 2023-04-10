/* eslint-disable max-len */
import React, { ReactNode, useContext, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from 'tss-react/mui';
import CookingInstructions from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/CookingInstructions';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { MealDataForBuilder } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { useChooseSlicers } from 'src/shared/hooks/useChooseSlicers';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import IngredientList from 'src/shared/components/MealBuilder/IngredientList';

const cardStyles = makeStyles()(() => {
  return {
    form: {
      width: '100%',
    },
  };
});

// VERY IMPORTANT: this component is used (shared) in custom-recipes, program and client-plan modules
function MealBuilder({ meal, setMealNameUpdated }: { meal: MealDataForBuilder; setMealNameUpdated: (mealNameUpdated: boolean) => void }) {
  const { classes } = cardStyles();
  const dispatch = useDispatch();
  const currentModuleContext = useContext(CurrentModuleContext);
  const { renameMealName } = useChooseSlicers(currentModuleContext.currentModule);

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
    dispatch(renameMealName(data.name));
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
            defaultValue={meal.name}
            {...register('name', { required: 'Please enter a name for your custom Recipe.' })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message as ReactNode}
          />
        </Box>

        <IngredientList meal={meal} />

        <Accordion expanded={panelExpanded === 'panel1'} onChange={handleAccordion('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: '38px' }} aria-controls="panel1d-content" id="panel1d-header">
            <Typography variant="subtitle1">Add instructions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CookingInstructions cookingInstruction={meal.cookingInstruction} />
          </AccordionDetails>
        </Accordion>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}

export default MealBuilder;
