import React, { useContext, useEffect, useState } from 'react';
import { Card, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import NutrientsDetail from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/NutrientsDetail';
import * as CustomRecipeDetailsSlice from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomRecipe } from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { Modules } from 'src/shared/Consts';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import RecipeNameInput from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/RecipeNameInput';
import { CustomRecipeBody } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import * as CustomRecipeBasicInfoSlice from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeBasicInfo';
import { defaultRecipeName } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';

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
  const authContext = useContext(AuthContext);

  const { classes } = cardStyles();
  const dispatch = useDispatch();
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const customRecipeDetailsState = useSelector((state: ReduxStates) => state.customRecipes.customRecipeDetails);
  const recipeNameBasicInfo = useSelector((state: ReduxStates) => state.customRecipes.customRecipeBasicInfo);

  const { createCustomRecipe, updateCustomRecipe } = useCustomRecipe();

  const [componentTouched, setComponentTouched] = useState(false);
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  const { _id, ...restCustomRecipe } = customRecipeDetailsState;
  const createUpdateCustomRecipeHandler = async () => {
    if (_customRecipe && _customRecipe._id) {
      await updateCustomRecipe({
        customRecipe: _id,
        ...restCustomRecipe,
        ...recipeNameBasicInfo,
        professional: authContext.professional,
      });
      dispatch(CustomRecipeBasicInfoSlice.renameRecipeName(defaultRecipeName));
    } else {
      await createCustomRecipe({ ...recipeNameBasicInfo, ...restCustomRecipe, professional: authContext.professional });
      dispatch(CustomRecipeBasicInfoSlice.renameRecipeName(defaultRecipeName));
    }
  };
  const closeIconDialogHandler = () => {
    if (componentTouched) {
      void createUpdateCustomRecipeHandler();
      setComponentTouched(false);
    }
    setClosedIconDialog(false);
  };

  useEffect(() => {
    if (_customRecipe !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, ...rest } = _customRecipe;
      dispatch(CustomRecipeDetailsSlice.acceptNewMealDetail(rest));
    } else {
      dispatch(CustomRecipeDetailsSlice.reinitializeMeal());
    }
    return () => {
      dispatch(CustomRecipeDetailsSlice.reinitializeMeal());
    };
  }, [_customRecipe]);

  useEffect(() => {
    if (!closedIconDialog) {
      reloadRecordListContext.setReloadRecordList(true);
      setOpenCreateUpdateCustomRecipeDialog(false);
    }
  }, [closedIconDialog]);

  return (
    <>
      <Dialog
        open={openCreateUpdateCustomRecipeDialog}
        onClose={() => {
          setOpenCreateUpdateCustomRecipeDialog(false);
          dispatch(CustomRecipeDetailsSlice.reinitializeMeal());
        }}
        scroll="paper"
        fullWidth={true}
        maxWidth="xl"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Create your custom recipe
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent
          dividers={true}
          style={{ minHeight: '900px', display: 'flex', justifyContent: 'space-between', border: '2px solid brown' }}
        >
          <Card
            style={{ width: '55%' }}
            sx={{ minWidth: 275 }}
            className={classes.card}
            variant="outlined"
            onClick={() => {
              if (!componentTouched) {
                setComponentTouched(true);
              }
            }}
          >
            <RecipeNameInput recipeName={_customRecipe?.name || recipeNameBasicInfo.name} parentComponentTouched={componentTouched} />
            <CurrentModuleContext.Provider value={{ currentModule: Modules.CUSTOM_RECIPES }}>
              <MealBuilder meal={{ _id, ...restCustomRecipe }} />
            </CurrentModuleContext.Provider>
          </Card>
          <NutrientsDetail />
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CreateUpdateCustomRecipeDialog;
