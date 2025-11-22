import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { useFormula } from 'src/modules/backoffice/formulas/adapters/out/FormulaActions';
import { FormulaGroup } from 'src/modules/backoffice/formulas/types/formula.d';

interface FormulaSelectorProps {
  setSelectedFormulaGroup: Dispatch<SetStateAction<FormulaGroup | null>>;
  style?: React.CSSProperties;
}

function FormulaSelector({ setSelectedFormulaGroup, style }: FormulaSelectorProps) {
  const formulasState = useSelector((state: ReduxStates) => state.formula.formula);
  const { getFormulas } = useFormula();

  const [localSelected, setLocalSelected] = useState<string>('');

  useEffect(() => {
    const fetchFormulas = async () => {
      await getFormulas();
    };
    fetchFormulas();
  }, []);

  useEffect(() => {
    if (formulasState.formulaGroups.length > 0) {
      setLocalSelected(formulasState.formulaGroups[0].spanishFormulaName);
      setSelectedFormulaGroup(formulasState.formulaGroups[0]);
    }
  }, [formulasState]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedSpanishName = event.target.value;
    setLocalSelected(selectedSpanishName);

    const selectedGroup = formulasState.formulaGroups.find((group) => group.spanishFormulaName === selectedSpanishName);

    if (selectedGroup) {
      setSelectedFormulaGroup(selectedGroup);
    }
  };

  return (
    <FormControl sx={{ width: '100%', marginBottom: 2, ...style }}>
      <InputLabel id="formula-selector-label">Fórmulas</InputLabel>
      <Select labelId="formula-selector-label" id="formula-selector" value={localSelected} label="Fórmulas" onChange={handleChange}>
        {formulasState.formulaGroups.map((group, index) => (
          <MenuItem key={index} value={group.spanishFormulaName}>
            {group.spanishFormulaName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormulaSelector;
