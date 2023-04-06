import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Button, Card, Dialog, DialogContent, TextField, Typography } from '@mui/material';
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
import { CustomRecipeBody } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';

const cardStyles = makeStyles()(() => {
  return {
    form: {
      width: '100%',
    },
  };
});

function MealConstructor({
  setMealNameUpdated,
  _customRecipe,
}: {
  setMealNameUpdated: (mealNameUpdated: boolean) => void;
  _customRecipe?: CustomRecipeBody;
}) {
  const { classes } = cardStyles();
  const dispatch = useDispatch();
  const customRecipe = useSelector((state: ReduxStates) => state.customRecipes.customRecipe);

  //   const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk } = useMessageDialog();
  //   const { createCustomRecipe, updateCustomRecipe } = useCustomRecipe();

  //   const reloadRecordListContext = useContext(ReloadRecordListContext);

  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const [customRecipeNameUpdated, setCustomRecipeNameUpdated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (_customRecipe !== undefined) {
      dispatch(showCustomRecipeDetail(_customRecipe));
    } else {
      dispatch(reinitializeCustomRecipe());
    }
    return () => {
      dispatch(reinitializeCustomRecipe());
    };
  }, [_customRecipe]);

  useEffect(() => {
    const createUpdateCustomRecipeHelper = async () => {
      if (_customRecipe && _customRecipe._id) {
        const { _id, ...restCustomRecipe } = customRecipe;
        await updateCustomRecipe({
          customRecipe: _id as string,
          ...restCustomRecipe,
        });
        setCustomRecipeNameUpdated(false);
        reset();
      } else {
        await createCustomRecipe(customRecipe);
        setCustomRecipeNameUpdated(false);
        reset();
      }
    };
    if (customRecipeNameUpdated) {
      void createUpdateCustomRecipeHelper();
    }
  }, [customRecipeNameUpdated, _customRecipe]);

  const handleAccordion = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };
  const onSubmitCustomRecipe = (data: { name: string }) => {
    dispatch(renameCustomRecipeName(data.name));
    setMealNameUpdated(true);
  };
  return (
    <div>
      <form
        className={classes.form}
        onMouseEnter={() => console.log('hellowwww')}
        onSubmit={handleSubmit(onSubmitCustomRecipe as any as SubmitHandler<FieldValues>)}
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
