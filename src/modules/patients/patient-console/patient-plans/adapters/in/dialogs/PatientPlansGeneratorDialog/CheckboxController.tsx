import React, { ChangeEvent, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { NutriBuilderParamStatus } from 'src/shared/Consts';

type ParamStatus = { uuid: string; status: NutriBuilderParamStatus };
function CheckboxController({ item, reducer }: { item: { uuid: string; name: string }; reducer: (param: ParamStatus) => AnyAction }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(reducer({ uuid: event.target.defaultValue, status: NutriBuilderParamStatus.SELECTED }));
    } else {
      dispatch(reducer({ uuid: event.target.defaultValue, status: NutriBuilderParamStatus.UNSELECTED }));
    }
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      style={{ width: '13%' }}
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={item.name}
      value={item.uuid}
    />
  );
}

export default CheckboxController;
