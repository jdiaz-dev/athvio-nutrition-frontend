import { Card, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import DatabaseSelector from 'src/shared/components/databaseSelector/DatabaseSelector';
import { useNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealActions';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { DatabasesEnum, NutritionalMealDatabasesEnum } from 'src/shared/Consts';
import { ReduxStates } from 'src/shared/types/types';
import MealSelector from 'src/shared/components/ImportMealDialog/MealSelector';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useMealBasicInfoSlicers } from 'src/shared/hooks/useMealBasicInfoSlicers';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { useMealsStates } from 'src/shared/components/PlanDetailDialog/useMealsStates';

function useMealSelector() {
  const { getNutritionalMeals } = useNutritionalMeal();
  //get program (with meals) also
  //get patient plan (with meals) also
  return { getMeals: getNutritionalMeals };
}
function ImportMealDialog({
  openImportMealDialog,
  setOpenImportMealDialog,
}: {
  openImportMealDialog: boolean;
  setOpenImportMealDialog: (param: boolean) => void;
}) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const authContext = useContext(AuthContext);
  const { mealDetailsState } = useMealsStates(currentModuleContext.currentModule);
  const mealsState = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMeals);

  const dispatch = useDispatch();
  const [database, setDatabase] = useState(NutritionalMealDatabasesEnum.CUSTOM_RECIPES as string);
  const [closeIconDialog, setCloseIconDialog] = useState(true);
  const [{ position, mealTag, name, ingredientDetails, cookingInstructions, macros }, setImportedMeal] = useState<Meal>({
    _id: '',
    position: -1,
    mealTag: '',
    name: '',
    ingredientDetails: [],
    cookingInstructions: '',
    macros: { weightInGrams: -1, protein: -1, carbs: -1, fat: -1, calories: -1 },
  });
  const { acceptNewMealBasicInfo } = useMealBasicInfoSlicers(currentModuleContext.currentModule);
  const { acceptNewMealDetail } = useMealBuilderSlicers(currentModuleContext.currentModule);

  const closeIconDialogHandler = () => {
    setOpenImportMealDialog(false);
  };
  const importMealHandler = () => {
    dispatch(acceptNewMealBasicInfo({ position, mealTag, name }));
    dispatch(acceptNewMealDetail({ _id: mealDetailsState._id, ingredientDetails, cookingInstructions, macros }));
    setOpenImportMealDialog(false);
  };
  const { getMeals } = useMealSelector();

  useEffect(() => {
    const fetchMeals = async () => {
      await getMeals({
        professional: authContext.professional,
        database: database as NutritionalMealDatabasesEnum,
        limit: 10,
        offset: 0,
      });
    };
    fetchMeals();
  }, [database]);

  return (
    <Dialog
      open={openImportMealDialog}
      onClose={closeIconDialogHandler}
      scroll="body"
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create your custom meal
        <CloseDialogIcon closedIconDialog={closeIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
      </DialogTitle>
      <DialogContent dividers={true}>
        <Card style={{ padding: '20px', marginBottom: '15px' }} variant="outlined">
          <DatabaseSelector database={database} setDatabase={setDatabase} databasesOrigin={DatabasesEnum.NUTRITIONAL_MEALS} />
          <MealSelector setImportedMeal={setImportedMeal} meals={mealsState?.data || []} />
        </Card>
        <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={importMealHandler} customSaveNameButton="Import" />
      </DialogContent>
    </Dialog>
  );
}

export default ImportMealDialog;
