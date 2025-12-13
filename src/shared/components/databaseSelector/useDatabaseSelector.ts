import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_FOOD_DATABASES } from 'src/modules/nutrition/internal-foods/adapters/out/InternalFoodQueries';
import { GetNutritionalMealDatabasesResponse } from 'src/modules/professionals/nutritional-meals/adapters/out/nutritionalMeal';
import { GET_NUTRITIONAL_MEAL_DATABASES } from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealQueries';
import { GetFoodDatabasesResponse } from 'src/shared/components/MealBuilder/food.types';
import { DatabasesEnum } from 'src/shared/Consts';

export const useDatabaseSelector = (databasesOrigin: DatabasesEnum) => {
  const [databaseList, setDatabaseList] = useState<string[]>([]);
  const { refetch: refetchFoods } = useQuery<GetFoodDatabasesResponse>(GET_FOOD_DATABASES);
  const { refetch: refetchNutritionalMeals } = useQuery<GetNutritionalMealDatabasesResponse>(GET_NUTRITIONAL_MEAL_DATABASES);

  useEffect(() => {
    const fetchDatabases = async () => {
      if (databasesOrigin === DatabasesEnum.FOODS) {
        const res = await refetchFoods();
        setDatabaseList(res.data?.getFoodDatabases || []);
      } else if (databasesOrigin === DatabasesEnum.NUTRITIONAL_MEALS) {
        const res = await refetchNutritionalMeals();
        setDatabaseList(res.data?.getNutritionalMealDatabases || []);
      }
    };
    fetchDatabases();
  }, [databasesOrigin]);

  return { databaseList };
};
