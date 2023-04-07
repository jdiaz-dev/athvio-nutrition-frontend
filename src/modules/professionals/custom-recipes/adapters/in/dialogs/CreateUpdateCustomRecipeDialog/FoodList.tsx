import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import TableBody from '@mui/material/TableBody';
import { Button, Paper, Table, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

import { GetFoodRequest, GetFoodsResponse } from 'src/modules/foods/adapters/out/food.types';
import SearcherBar from 'src/shared/components/SearcherBar';
import { useDispatch } from 'react-redux';
import { addIngredient } from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import { IngredientType } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import Paginator from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/Paginator';
import { GET_FOODS } from 'src/modules/foods/adapters/out/FoodQueries';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// eslint-disable-next-line max-len
import { FoddAddedContext } from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/IngredientList';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import { usePaginator } from 'src/shared/hooks/usePaginator';

function FoodList() {
  const dispatch = useDispatch();

  const foddAddedContext = useContext(FoddAddedContext);

  const {
    searchWords,
    setSearchWords,
    matchedRecords,
    setMatchedRecords,
    choosedWord,
    setChoosedWord,
    recentlyTypedWord,
    setRecentlyTypedWord,
  } = useSearcher();
  const { length, setLength, offset, setOffset, rowsPerPage, setRowsPerPage, currentPage, setCurrentPage } = usePaginator();

  const [foods, setFoods] = useState<IngredientType[]>([]);
  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const input = {
    offset: offset,
    limit: 5,
  };
  const { data, loading, refetch } = useQuery<GetFoodsResponse, GetFoodRequest>(GET_FOODS, {
    variables: {
      input,
    },
  });
  const handleAddFoodAncle = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };
  useEffect(() => {
    const _input = searchWords.length > 0 ? { ...input, search: searchWords } : input;
    const getFoods = async () => {
      const res = await refetch({ input: _input });
      // console.log('---------res', res);
      setFoods(
        res.data?.getFoods.data.map((food) => {
          return {
            amount: 0,
            ingredientName: food.name,
            unit: 'g',
          };
        }),
      );
      setLength(res.data.getFoods.meta.total);
      setOffset(res.data.getFoods.meta.offset);
    };

    const getFoodsForSearcher = async () => {
      const res = await refetch({ input: _input });
      setMatchedRecords(res.data.getFoods.data.map((food) => food.name));
    };

    const verifyNewWordToSearch = () => {
      if (searchWords.length === 1 && recentlyTypedWord) {
        void getFoodsForSearcher();
        setRecentlyTypedWord(false);
      }
    };
    const verifyChosedWordsFromSearcher = () => {
      if (searchWords.length >= 0 && choosedWord) {
        void getFoods();
        setChoosedWord(false);
      }
    };

    const vefifyFirstDataCallToServer = () => {
      if (data && !choosedWord && searchWords.length === 0) {
        setFoods(
          data?.getFoods.data.map((food) => {
            return {
              amount: 0,
              ingredientName: food.name,
              unit: 'g',
            };
          }),
        );

        // console.log('---------data', data);
        setLength(data.getFoods.meta.total);
        setOffset(data.getFoods.meta.offset);
        setRowsPerPage(5);
      }
    };
    verifyNewWordToSearch();
    verifyChosedWordsFromSearcher();
    vefifyFirstDataCallToServer();
  }, [searchWords, choosedWord, recentlyTypedWord, data]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Accordion expanded={panelExpanded === 'panel1'} onChange={handleAddFoodAncle('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Add food</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SearcherBar
            setSearchWords={setSearchWords}
            matchedRecords={matchedRecords}
            setChoosedWord={setChoosedWord}
            setRecentlyTypedWord={setRecentlyTypedWord}
          />
          {foods.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell width={'15%'}>Amount</StyledTableCell>
                    <StyledTableCell>Food</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ maxHeight: '10px' }}>
                  {foods.map((ingredient) => (
                    <StyledTableRow key={ingredient.ingredientName}>
                      <StyledTableCell style={{ padding: '3px', paddingLeft: '7px' }} align="right">
                        <TextField
                          inputProps={{ style: { fontSize: 'revert', height: '11px' } }}
                          InputLabelProps={{ style: { fontSize: 'revert' } }}
                          style={{ width: '100%' }}
                          id="filled-hidden-label-small"
                          label="(g)"
                          variant="outlined"
                          size="small"
                          type="number"
                          defaultValue={ingredient.amount}
                          onChange={(e) => (ingredient.amount = Number(e.target.value))}
                        />
                      </StyledTableCell>
                      <StyledTableCell style={{ padding: '4px' }} component="th" scope="row">
                        {ingredient.ingredientName}
                      </StyledTableCell>
                      <StyledTableCell align="right" style={{ padding: '0px', paddingRight: '7px' }}>
                        <Button
                          style={{ fontSize: '12px', height: '24px' }}
                          size="small"
                          variant="contained"
                          onClick={() => {
                            if (ingredient.amount > 0) {
                              dispatch(
                                addIngredient({
                                  amount: ingredient.amount,
                                  ingredientName: ingredient.ingredientName,
                                  unit: 'g',
                                }),
                              );
                              foddAddedContext.setFoodAdded(true);
                            }
                          }}
                        >
                          Add
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Paginator
            length={length}
            offset={offset}
            setOffset={setOffset}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default FoodList;
