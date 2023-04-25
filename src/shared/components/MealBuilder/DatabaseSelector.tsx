import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GetFoodDatabasesResponse } from 'src/shared/components/MealBuilder/food.types';
import { GET_FOOD_DATABASES } from 'src/shared/components/MealBuilder/FoodQueries';

function DatabaseSelector({
  database,
  setDatabase,
  setDatabaseChanged,
}: {
  database: string;
  setDatabase: (database: string) => void;
  setDatabaseChanged: (databaseChanged: boolean) => void;
}) {
  const { data } = useQuery<GetFoodDatabasesResponse>(GET_FOOD_DATABASES);
  const handleChange = (event: SelectChangeEvent) => {
    setDatabase(event.target.value);
    setDatabaseChanged(true);
  };

  return (
    <div>
      {data?.getFoodDatabases && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Database</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={database} label="Database" onChange={handleChange}>
            {data.getFoodDatabases.map((foodDatabase, index) => (
              <MenuItem key={index} value={foodDatabase}>
                {foodDatabase}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default DatabaseSelector;
