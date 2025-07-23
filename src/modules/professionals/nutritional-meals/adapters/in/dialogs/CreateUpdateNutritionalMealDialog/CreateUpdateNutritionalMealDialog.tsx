import React, { useContext, useEffect, useState } from 'react';
import { Card, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as NutritionalMealDetailsSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { MealSourceEnum, Modules } from 'src/shared/Consts';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import NutritionalMealNameInput from 'src/modules/professionals/nutritional-meals/adapters/in/dialogs/CreateUpdateNutritionalMealDialog/NutritionalMealNameInput';
import { NutritionalMealBody } from 'src/modules/professionals/nutritional-meals/adapters/out/nutritionalMeal';
import * as NutritionalMealBasicInfoSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealBasicInfo';
import { defaultNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealInitialState';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import { formStyles } from 'src/shared/styles/styles';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import { EnableEditionContext } from 'src/shared/components/wrappers/EnablerEditionWrapper/EnableEditionContext';
import ImageContainer from 'src/modules/professionals/nutritional-meals/adapters/in/dialogs/CreateUpdateNutritionalMealDialog/ImageContainer';
import NutritionalMealOptions from 'src/modules/professionals/nutritional-meals/adapters/in/dialogs/CreateUpdateNutritionalMealDialog/NutritionalMealOptions';
import FoodAnalyzerList from 'src/modules/food-analyzers/adapters/in/components/FoodAnalyzerList';

function CreateUpdateNutritionalMealDialog({
  openCreateUpdateNutritionalMealDialog,
  setOpenCreateUpdateNutritionalMealDialog,
  dialogTitle,
  _nutritionalMeal,
}: {
  openCreateUpdateNutritionalMealDialog: boolean;
  setOpenCreateUpdateNutritionalMealDialog: (openDialog: boolean) => void;
  dialogTitle: string;
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
  const [showAnticancerProperties, setShowAnticancerProperties] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);

  const { uuid, ...restNutritionalMeal } = nutritionalMealDetailsState;
  const createUpdateNutritionalMealHandler = async () => {
    if (_nutritionalMeal && _nutritionalMeal.uuid) {
      await updateNutritionalMeal({
        nutritionalMeal: uuid,
        ...restNutritionalMeal,
        ...mealNameBasicInfo,
        professional: authContext.professional,
        image: newImage !== null ? newImage : null,
      });
      dispatch(NutritionalMealBasicInfoSlice.renameNutritionalMeal(defaultNutritionalMeal));
      setOpenCreateUpdateNutritionalMealDialog(false);
    } else {
      await createNutritionalMeal({
        ...mealNameBasicInfo,
        ...restNutritionalMeal,
        professional: authContext.professional,
        image: newImage !== null ? newImage : null,
      });
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
      const { name, source, image, ...rest } = _nutritionalMeal;
      dispatch(NutritionalMealBasicInfoSlice.renameNutritionalMeal(name));
      dispatch(NutritionalMealDetailsSlice.acceptNewMealDetail(rest));
      dispatch(NutritionalMealBasicInfoSlice.setImage(image !== null ? (image as string) : null));
    } else {
      dispatch(NutritionalMealDetailsSlice.reinitializeMeal());
    }

    return () => {
      dispatch(NutritionalMealDetailsSlice.reinitializeMeal());
      dispatch(NutritionalMealBasicInfoSlice.resetName());
      dispatch(NutritionalMealBasicInfoSlice.setImage(null));
    };
  }, [_nutritionalMeal]);

  useEffect(() => {
    if (!closedIconDialog) {
      reloadRecordListContext.setReloadRecordList(true);
      setOpenCreateUpdateNutritionalMealDialog(false);
    }
  }, [closedIconDialog]);

  const internalFoods = restNutritionalMeal.ingredientDetails.reduce((accum, item) => {
    if (item.ingredient?.internalFood) accum.push(item.ingredient.internalFood as string);
    return accum;
  }, [] as string[]);

  return (
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
        {dialogTitle}
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
          <EnableEditionContext.Provider
            value={{ enableEdition: _nutritionalMeal === undefined ? true : _nutritionalMeal.source !== MealSourceEnum.SYSTEM }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <NutritionalMealNameInput />
              <NutritionalMealOptions setShowAnticancerProperties={setShowAnticancerProperties} />
            </div>
            <ImageContainer image={mealNameBasicInfo.image} setNewImage={setNewImage} />
            <CurrentModuleContext.Provider value={{ currentModule: Modules.NUTRITIONAL_MEALS }}>
              {!showAnticancerProperties && <MealBuilder meal={{ uuid, ...restNutritionalMeal }} />}
              {showAnticancerProperties && <FoodAnalyzerList internalFoods={internalFoods} />}
            </CurrentModuleContext.Provider>
          </EnableEditionContext.Provider>
        </Card>
        <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={createUpdateNutritionalMealHandler} />

        {/* <NutrientsDetail /> */}
      </DialogContent>
    </Dialog>
  );
}
export default CreateUpdateNutritionalMealDialog;
