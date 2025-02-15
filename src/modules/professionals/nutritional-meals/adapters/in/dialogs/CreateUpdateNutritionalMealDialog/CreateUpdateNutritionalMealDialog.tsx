import React, { useContext, useEffect, useState } from 'react';
import { Card, Dialog, DialogContent, DialogTitle } from '@mui/material';

import * as NutritionalMealDetailsSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { Modules } from 'src/shared/Consts';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import NutritionalMealNameInput from 'src/modules/professionals/nutritional-meals/adapters/in/dialogs/CreateUpdateNutritionalMealDialog/NutritionalMealNameInput';
import { NutritionalMealBody } from 'src/modules/professionals/nutritional-meals/adapters/out/nutritionalMeal.types';
import * as NutritionalMealBasicInfoSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealBasicInfo';
import { defaultNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealInitialState';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { formStyles } from 'src/shared/styles/styles';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';

function CreateUpdateNutritionalMealDialog({
  openCreateUpdateNutritionalMealDialog,
  setOpenCreateUpdateNutritionalMealDialog,
  _nutritionalMeal,
}: {
  openCreateUpdateNutritionalMealDialog: boolean;
  setOpenCreateUpdateNutritionalMealDialog: (openDialog: boolean) => void;
  _nutritionalMeal?: NutritionalMealBody;
}) {
  const authContext = useContext(AuthContext);

  const { classes } = formStyles();
  const dispatch = useDispatch();
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const nutritionalMealDetailsState = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMealDetails);
  const mealNameBasicInfo = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMealBasicInfo);

  const { createNutritionalMeal, updateNutritionalMeal } = useNutritionalMeal();

  const [componentTouched, setComponentTouched] = useState(false);
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  const { _id, ...restNutritionalMeal } = nutritionalMealDetailsState;
  const createUpdateNutritionalMealHandler = async () => {
    if (_nutritionalMeal && _nutritionalMeal._id) {
      await updateNutritionalMeal({
        nutritionalMeal: _id,
        ...restNutritionalMeal,
        ...mealNameBasicInfo,
        professional: authContext.professional,
      });
      dispatch(NutritionalMealBasicInfoSlice.renameNutritionalMeal(defaultNutritionalMeal));
      setOpenCreateUpdateNutritionalMealDialog(false);
    } else {
      await createNutritionalMeal({ ...mealNameBasicInfo, ...restNutritionalMeal, professional: authContext.professional });
      dispatch(NutritionalMealBasicInfoSlice.renameNutritionalMeal(defaultNutritionalMeal));
      setOpenCreateUpdateNutritionalMealDialog(false);
    }
  };
  const closeIconDialogHandler = () => {
    if (componentTouched) {
      setComponentTouched(false);
    }
    setClosedIconDialog(false);
    setOpenCreateUpdateNutritionalMealDialog(false);
  };

  useEffect(() => {
    if (_nutritionalMeal !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, ...rest } = _nutritionalMeal;
      dispatch(NutritionalMealDetailsSlice.acceptNewMealDetail(rest));
    } else {
      dispatch(NutritionalMealDetailsSlice.reinitializeMeal());
    }
    return () => {
      dispatch(NutritionalMealDetailsSlice.reinitializeMeal());
    };
  }, [_nutritionalMeal]);

  useEffect(() => {
    if (!closedIconDialog) {
      reloadRecordListContext.setReloadRecordList(true);
      setOpenCreateUpdateNutritionalMealDialog(false);
    }
  }, [closedIconDialog]);

  return (
    <>
      <Dialog
        open={openCreateUpdateNutritionalMealDialog}
        onClose={() => {
          setOpenCreateUpdateNutritionalMealDialog(false);
          dispatch(NutritionalMealDetailsSlice.reinitializeMeal());
        }}
        scroll="body"
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Create your custom meal
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
            <NutritionalMealNameInput
              nutritionalMeal={_nutritionalMeal?.name || mealNameBasicInfo.name}
              parentComponentTouched={componentTouched}
            />
            <CurrentModuleContext.Provider value={{ currentModule: Modules.NUTRITIONAL_MEALS }}>
              <MealBuilder meal={{ _id, ...restNutritionalMeal }} />
            </CurrentModuleContext.Provider>
          </Card>
          <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={createUpdateNutritionalMealHandler} />

          {/* <NutrientsDetail /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CreateUpdateNutritionalMealDialog;
