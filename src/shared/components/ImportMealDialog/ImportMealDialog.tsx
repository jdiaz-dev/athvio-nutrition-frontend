import { Card, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelAndSaveButtons from 'src/shared/components/CancelAndSaveButtons';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import DatabaseSelector from 'src/shared/components/databaseSelector/DatabaseSelector';
import { useNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealActions';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { DatabasesEnum, defaultMealTag, NutritionalMealDatabasesEnum } from 'src/shared/Consts';
import { ReduxStates } from 'src/shared/types/types';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useMealBasicInfoSlicers } from 'src/shared/hooks/useMealBasicInfoSlicers';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { useMealsStates } from 'src/shared/components/PlanDetailDialog/useMealsStates';
import SearcherBar from 'src/shared/components/SearcherAndSelector/SearcherBar';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import { NutritionalMealBody } from 'src/modules/professionals/nutritional-meals/adapters/out/nutritionalMeal';

function useMealSelector() {
  const { getNutritionalMeals } = useNutritionalMeal();
  //get program (with meals) also
  //get patient plan (with meals) also
  return { getMeals: getNutritionalMeals };
}

function ImportMealDialog({
  openImportMealDialog,
  closeImportMealHandler,
}: {
  openImportMealDialog: boolean;
  closeImportMealHandler: () => void;
}) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const authContext = useContext(AuthContext);
  const { mealDetailsState } = useMealsStates(currentModuleContext.currentModule);
  const mealsState = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMeals);

  const dispatch = useDispatch();
  const [database, setDatabase] = useState(NutritionalMealDatabasesEnum.ALL as string);
  const [closeIconDialog, setCloseIconDialog] = useState(true);
  const [{ position, mealTag, name, image, ingredientDetails, cookingInstructions, macros }, setImportedMeal] = useState<Meal>({
    _id: '',
    position: -1,
    mealTag: '',
    name: '',
    image: null,
    ingredientDetails: [],
    cookingInstructions: '',
    macros: { weightInGrams: -1, protein: -1, carbs: -1, fat: -1, calories: -1 },
  });
  const { searchWords, setSearchWords, matchedRecords, setMatchedRecords, choosedWord, setChoosedWord, setRecentlyTypedWord } =
    useSearcher();
  const { acceptNewMealBasicInfo } = useMealBasicInfoSlicers(currentModuleContext.currentModule);
  const { acceptNewMealDetail } = useMealBuilderSlicers(currentModuleContext.currentModule);

  const closeIconDialogHandler = () => {
    closeImportMealHandler();
  };
  const importMealHandler = () => {
    dispatch(acceptNewMealBasicInfo({ position, mealTag, name, image }));
    dispatch(acceptNewMealDetail({ _id: mealDetailsState._id, ingredientDetails, cookingInstructions, macros }));
    closeImportMealHandler();
  };
  const { getMeals } = useMealSelector();

  useEffect(() => {
    const fetchMeals = async () => {
      await getMeals({
        professional: authContext.professional,
        database: database as NutritionalMealDatabasesEnum,
        limit: 10,
        offset: 0,
        ...(searchWords.length > 0 && { search: searchWords }),
      });
    };
    fetchMeals();
  }, [database, searchWords]);

  useEffect(() => {
    setMatchedRecords(mealsState?.data.map((item) => item.name) || []);
  }, [mealsState]);

  useEffect(() => {
    if (choosedWord) {
      const res = mealsState?.data.find((item) => item.name === searchWords[0]) as NutritionalMealBody;
      setImportedMeal({ ...res, position: -1, mealTag: defaultMealTag });
    }
  }, [choosedWord]);

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
        Import meal
        <CloseDialogIcon closedIconDialog={closeIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
      </DialogTitle>
      <DialogContent dividers={true}>
        <Card style={{ padding: '20px', marginBottom: '15px' }} variant="outlined">
          <DatabaseSelector
            database={database}
            setDatabase={setDatabase}
            databasesOrigin={DatabasesEnum.NUTRITIONAL_MEALS}
            label="Source"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <SearcherBar
            setSearchWords={setSearchWords}
            matchedRecords={matchedRecords}
            setChoosedWord={setChoosedWord}
            setRecentlyTypedWord={setRecentlyTypedWord}
            withMultipleOption={false}
          />
        </Card>
        <CancelAndSaveButtons cancelHandler={closeIconDialogHandler} saveHandler={importMealHandler} customSaveNameButton="Import" />
      </DialogContent>
    </Dialog>
  );
}

export default ImportMealDialog;
