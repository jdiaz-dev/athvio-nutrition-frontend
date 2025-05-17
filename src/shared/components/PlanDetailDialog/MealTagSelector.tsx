import React, { Dispatch, SetStateAction, useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { mealTagKeyList } from 'src/shared/Consts';
import { useMealBasicInfoSlicers } from 'src/shared/hooks/useMealBasicInfoSlicers';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useTranslation } from 'react-i18next';

function MealTagSelector({ mealTag, setMealContainerTouched }: { mealTag: string; setMealContainerTouched: Dispatch<SetStateAction<boolean>> }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameMealTag } = useMealBasicInfoSlicers(currentModuleContext.currentModule);
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(renameMealTag(event.target.value));
  };

  return (
    <div style={{ width: '29%', marginRight: '10px' }}>
      {
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{t('mealBuilder.titles.mealTag')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mealTag}
            label="Database"
            onChange={handleChange}
            onOpen={() => setMealContainerTouched(true)}
          >
            {mealTagKeyList.map((mealTagKey, index) => (
              <MenuItem key={index} value={t(mealTagKey as any)}>
                {t(mealTagKey as any)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }
    </div>
  );
}

export default MealTagSelector;
