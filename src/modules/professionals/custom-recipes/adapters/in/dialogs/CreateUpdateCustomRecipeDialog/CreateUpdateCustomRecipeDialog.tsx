import React, { useContext, useEffect, useState } from 'react';
import { Card, Dialog, DialogContent, DialogTitle } from '@mui/material';

import * as CustomRecipeDetailsSlice from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomRecipe } from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { Modules } from 'src/shared/Consts';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import RecipeNameInput from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/RecipeNameInput';
import { NutritionalMealBody } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import * as CustomRecipeBasicInfoSlice from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeBasicInfo';
import { defaultRecipeName } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { formStyles } from 'src/shared/styles/styles';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';

function CreateUpdateCustomRecipeDialog({
  openCreateUpdateCustomRecipeDialog,
  setOpenCreateUpdateCustomRecipeDialog,
  _customRecipe,
}: {
  openCreateUpdateCustomRecipeDialog: boolean;
  setOpenCreateUpdateCustomRecipeDialog: (openDialog: boolean) => void;
  _customRecipe?: NutritionalMealBody;
}) {
  const authContext = useContext(AuthContext);

  const { classes } = formStyles();
  const dispatch = useDispatch();
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const customRecipeDetailsState = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMealDetails);
  const recipeNameBasicInfo = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMealBasicInfo);

  const { createCustomRecipe, updateCustomRecipe } = useCustomRecipe();

  const [componentTouched, setComponentTouched] = useState(false);
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  const { _id, ...restCustomRecipe } = customRecipeDetailsState;
  const createUpdateCustomRecipeHandler = async () => {
    if (_customRecipe && _customRecipe._id) {
      await updateCustomRecipe({
        nutritionalMeal: _id,
        ...restCustomRecipe,
        ...recipeNameBasicInfo,
        professional: authContext.professional,
      });
      dispatch(CustomRecipeBasicInfoSlice.renameRecipeName(defaultRecipeName));
      setOpenCreateUpdateCustomRecipeDialog(false);
    } else {
      await createCustomRecipe({ ...recipeNameBasicInfo, ...restCustomRecipe, professional: authContext.professional });
      dispatch(CustomRecipeBasicInfoSlice.renameRecipeName(defaultRecipeName));
      setOpenCreateUpdateCustomRecipeDialog(false);
    }
  };
  const closeIconDialogHandler = () => {
    if (componentTouched) {
      setComponentTouched(false);
    }
    setClosedIconDialog(false);
    setOpenCreateUpdateCustomRecipeDialog(false);
  };

  useEffect(() => {
    console.log('-------_customRecipe', _customRecipe);
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
        scroll="body"
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Create your custom recipe
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
            <RecipeNameInput recipeName={_customRecipe?.name || recipeNameBasicInfo.name} parentComponentTouched={componentTouched} />
            <CurrentModuleContext.Provider value={{ currentModule: Modules.CUSTOM_RECIPES }}>
              <MealBuilder meal={{ _id, ...restCustomRecipe }} />
            </CurrentModuleContext.Provider>
          </Card>
          <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={createUpdateCustomRecipeHandler} />

          {/* <NutrientsDetail /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CreateUpdateCustomRecipeDialog;
