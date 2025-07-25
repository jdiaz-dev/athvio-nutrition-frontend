import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useFoodAnalyzer } from 'src/modules/food-analyzers/adapters/out/FoodAnalyzerActions';
import { ReduxStates } from 'src/shared/types/types';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { FoodAnalyzer } from 'src/modules/food-analyzers/adapters/out/FoodAnalyzer';

type FoodCompoundMechanism = {
  food: string;
  compound: string;
  mechanism?: string;
  description?: string;
};

function flattenAnalyzedFoods(foods: FoodAnalyzer[]): FoodCompoundMechanism[] {
  const result: FoodCompoundMechanism[] = [];

  for (const food of foods) {
    const foodName = food.spanishName;

    if (!Array.isArray(food.compounds)) continue;

    for (const compound of food.compounds) {
      const compoundName = compound.spanishName;

      if (Array.isArray(compound.mechanisms) && compound.mechanisms.length > 0) {
        for (const mechanism of compound.mechanisms) {
          result.push({
            food: foodName,
            compound: compoundName,
            mechanism: mechanism?.spanishCategory,
            description: mechanism?.spanishDescription,
          });
        }
      } else {
        result.push({
          food: foodName,
          compound: compoundName,
          mechanism: '',
        });
      }
    }
  }

  return result;
}

function FoodAnalyzerList({ internalFoods }: { internalFoods: string[] }) {
  const foodAnalyzersState = useSelector((state: ReduxStates) => state.foodAnalyzers.foodAnalyzers);
  const { getAnalyzedFoods } = useFoodAnalyzer();
  const [rows, setRows] = useState<FoodCompoundMechanism[]>([]);

  useEffect(() => {
    const fetchAnalyzedFoods = async () => {
      await getAnalyzedFoods({ internalFoods });
      const flatRows = flattenAnalyzedFoods(foodAnalyzersState);
      setRows(flatRows);
    };
    if (internalFoods.length > 0) fetchAnalyzedFoods();
  }, internalFoods);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <strong>Alimento</strong>
            </StyledTableCell>
            <StyledTableCell>
              <strong>Componente</strong>
            </StyledTableCell>
            <StyledTableCell>
              <strong>Mecanismo (categoria)</strong>
            </StyledTableCell>
            <StyledTableCell>
              <strong>Mecanismo (descripcion)</strong>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((food, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{food.food}</StyledTableCell>
                <StyledTableCell>{food.compound}</StyledTableCell>
                <StyledTableCell>{food.mechanism}</StyledTableCell>
                <StyledTableCell>{food.description}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FoodAnalyzerList;
