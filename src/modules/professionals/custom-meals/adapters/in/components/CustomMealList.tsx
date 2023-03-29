import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Clients, GetClientResponse, GetClientsRequest } from 'src/modules/clients/clients/adapters/out/client.types';
import { GET_CLIENTS } from 'src/modules/clients/clients/adapters/out/ClientQueries';
import { useQuery } from '@apollo/client';
import { SearcherBarContext, ProfessionalIdContext, ReloadClientListContext } from 'src/App';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { useCustomMeal } from 'src/modules/professionals/custom-meals/adapters/out/CustomMealActions';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types';
import CustomMeal from 'src/modules/professionals/custom-meals/adapters/in/components/CustomMeal';

function CustomMealList({
  reloadCustomMealList,
  setReloadCustomMealList,
}: {
  reloadCustomMealList: boolean;
  setReloadCustomMealList: (reload: boolean) => void;
}) {
  console.log('----------CustomMealList called');
  const customMealList = useSelector((state: ReduxStates) => state.customMeals.customMealList);
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadClientListContext = useContext(ReloadClientListContext);
  const searcherBarContext = useContext(SearcherBarContext);
  const { getCustomMeals } = useCustomMeal();

  useEffect(() => {
    const getCustomMealHelper = async () => {
      console.log('----------getCustomMealHelper called');

      const _input = {
        professional: professionalIdContext.professional,
        offset: 0,
        limit: 10,
      };

      await getCustomMeals(_input);
      setReloadCustomMealList(false);
    };
    if (professionalIdContext.professional) {
      void getCustomMealHelper();
    }
  }, [reloadCustomMealList, professionalIdContext.professional]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={'15%'}>Meal name </StyledTableCell>
              <StyledTableCell align="right">Total Protein&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Total Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Total Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Total Calories&nbsp;(kcal)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ border: '20px solid blue' }}>
            {customMealList &&
              customMealList?.data.map((customMeal, index) => (
                <React.Fragment key={index}>
                  <CustomMeal {...customMeal} />
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CustomMealList;
