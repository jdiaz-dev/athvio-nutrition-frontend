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
import { CustomRecipeBody } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import * as CustomRecipeBasicInfoSlice from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeBasicInfo';
import { defaultRecipeName } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { formStyles } from 'src/shared/styles/styles';

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

  const { classes } = formStyles();
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
        scroll="body"
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Create your custom recipe
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent dividers={true} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card
            className={classes.card}
            style={{ padding: '20px' }}
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
          {/* <NutrientsDetail /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CreateUpdateCustomRecipeDialog;
