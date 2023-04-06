import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Box, Button, Card, Dialog, DialogContent, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { makeStyles } from 'tss-react/mui';

import IngredientList from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/IngredientList';
import NutrientsDetail from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/NutrientsDetail';
import CookingInstructions from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/CookingInstructions';
import {
  reinitializeCustomRecipe,
  showCustomRecipeDetail,
  renameCustomRecipeName,
} from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomRecipe } from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeActions';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { CustomRecipeBody } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
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

function CreateUpdateCustomRecipeDialog({
  openCreateUpdateCustomRecipeDialog,
  setOpenCreateUpdateCustomRecipeDialog,
  _customRecipe,
}: {
  openCreateUpdateCustomRecipeDialog: boolean;
  setOpenCreateUpdateCustomRecipeDialog: (openDialog: boolean) => void;
  _customRecipe?: CustomRecipeBody;
}) {
  const { classes } = cardStyles();
  const dispatch = useDispatch();
  const customRecipe = useSelector((state: ReduxStates) => state.customRecipes.customRecipe);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk } = useMessageDialog();
  const { createCustomRecipe, updateCustomRecipe } = useCustomRecipe();

  const reloadRecordListContext = useContext(ReloadRecordListContext);

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
        setMessage('Custom Recipe updated successfully');
        setCustomRecipeNameUpdated(false);
        reset();
      } else {
        await createCustomRecipe(customRecipe);
        setMessage('Custom Recipe created successfully');
        setCustomRecipeNameUpdated(false);
        reset();
      }
      setOpenDialog(true);
    };
    if (customRecipeNameUpdated) {
      void createUpdateCustomRecipeHelper();
    }
    if (!openDialog && messageOk) {
      setOpenCreateUpdateCustomRecipeDialog(false);
      reloadRecordListContext.setReloadRecordList(true);
      setMessageOk(false);
    }
  }, [customRecipeNameUpdated, openDialog, _customRecipe, messageOk]);

  const handleAccordion = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };
  const onSubmitCustomRecipe = (data: { name: string }) => {
    dispatch(renameCustomRecipeName(data.name));
    setCustomRecipeNameUpdated(true);
  };

  return (
    <>
      <Dialog
        open={openCreateUpdateCustomRecipeDialog}
        onClose={() => {
          setOpenCreateUpdateCustomRecipeDialog(false);
        }}
        scroll="paper"
        fullWidth={true}
        // maxWidth="md"
        maxWidth="xl"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent
          dividers={true}
          style={{ minHeight: '900px', display: 'flex', justifyContent: 'space-between', border: '2px solid brown' }}
        >
          <Card style={{ width: '55%' }} sx={{ minWidth: 275 }} className={classes.card} variant="outlined">
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
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ height: '38px' }}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
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
          </Card>
          <NutrientsDetail />
        </DialogContent>
        {openDialog && (
          <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} />
        )}
      </Dialog>
    </>
  );
}
export default CreateUpdateCustomRecipeDialog;
