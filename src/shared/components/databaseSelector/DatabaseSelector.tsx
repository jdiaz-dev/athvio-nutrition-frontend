import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useDatabaseSelector } from 'src/shared/components/databaseSelector/useDatabaseSelector';
import { DatabasesEnum } from 'src/shared/Consts';

function DatabaseSelector({
  database,
  setDatabase,
  setDatabaseChanged,
  databasesOrigin,
  label,
  style,
}: {
  database: string;
  setDatabase: (database: string) => void;
  setDatabaseChanged?: (databaseChanged: boolean) => void;
  databasesOrigin: DatabasesEnum;
  label?: string;
  style?: React.CSSProperties;
}) {
  const { databaseList } = useDatabaseSelector(databasesOrigin);
  const handleChange = (event: SelectChangeEvent) => {
    setDatabase(event.target.value);
    if (setDatabaseChanged) setDatabaseChanged(true);
  };

  return (
    <div style={{ width: '29%', ...style }}>
      {databaseList && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label ? label : 'Database'}</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={database} label="Database" onChange={handleChange}>
            {databaseList.map((foodDatabase, index) => (
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
