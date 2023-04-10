import React, { useContext, useEffect, useState } from 'react';
import { Card, Dialog, DialogContent } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import NutrientsDetail from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/NutrientsDetail';
import * as CustomRecipeSlicers from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomRecipe } from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeActions';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { CustomRecipeBody } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { Modules } from 'src/shared/Consts';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';

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
  const customRecipeState = useSelector((state: ReduxStates) => state.customRecipes.customRecipe);

  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk } = useMessageDialog();
  const { createCustomRecipe, updateCustomRecipe } = useCustomRecipe();

  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const [customRecipeNameUpdated, setCustomRecipeNameUpdated] = useState(false);

  useEffect(() => {
    if (_customRecipe !== undefined) {
      dispatch(CustomRecipeSlicers.acceptNewMealDetail(_customRecipe));
    } else {
      dispatch(CustomRecipeSlicers.reinitializeMeal());
    }
    return () => {
      dispatch(CustomRecipeSlicers.reinitializeMeal());
    };
  }, [_customRecipe]);

  const { professional, ...restCustomRecipe } = customRecipeState;
  useEffect(() => {
    const createUpdateCustomRecipeHelper = async () => {
      if (_customRecipe && _customRecipe._id) {
        await updateCustomRecipe({
          customRecipe: restCustomRecipe._id,
          professional,
          ...restCustomRecipe,
        });
        setMessage('Custom Recipe updated successfully');
        setCustomRecipeNameUpdated(false);
      } else {
        await createCustomRecipe(customRecipeState);
        setMessage('Custom Recipe created successfully');
        setCustomRecipeNameUpdated(false);
      }
      setOpenDialog(true);
    };
    if (customRecipeNameUpdated) {
      void createUpdateCustomRecipeHelper();
    }
  }, [customRecipeNameUpdated, _customRecipe]);

  useEffect(() => {
    if (!openDialog && messageOk) {
      setOpenCreateUpdateCustomRecipeDialog(false);
      reloadRecordListContext.setReloadRecordList(true);
      setMessageOk(false);
    }
  }, [openDialog, messageOk]);

  return (
    <>
      <Dialog
        open={openCreateUpdateCustomRecipeDialog}
        onClose={() => {
          setOpenCreateUpdateCustomRecipeDialog(false);
          dispatch(CustomRecipeSlicers.reinitializeMeal());
        }}
        scroll="paper"
        fullWidth={true}
        maxWidth="xl"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent
          dividers={true}
          style={{ minHeight: '900px', display: 'flex', justifyContent: 'space-between', border: '2px solid brown' }}
        >
          <Card style={{ width: '55%' }} sx={{ minWidth: 275 }} className={classes.card} variant="outlined">
            <CurrentModuleContext.Provider value={{ currentModule: Modules.CUSTOM_RECIPES }}>
              <MealBuilder meal={restCustomRecipe} setMealNameUpdated={setCustomRecipeNameUpdated} />
            </CurrentModuleContext.Provider>
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
