import React, { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { Button, Paper, Table, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { SearcherBarContext } from 'src/App';
import { GET_FOODS } from 'src/modules/professionals/custom-meals/adapters/graphql/FoodsQueries';
import { GetFoodRequest, GetFoodsResponse } from 'src/modules/professionals/custom-meals/adapters/out/food.types';
import SearcherBar from 'src/shared/components/SearcherBar';
import { useDispatch } from 'react-redux';
import { addIngredient } from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import { IngredientType } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    'border': `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  'backgroundColor': theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  'flexDirection': 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function FoodList() {
  const searcherBarContext = useContext(SearcherBarContext);
  const dispatch = useDispatch();
  const [foods, setFoods] = useState<IngredientType[]>([]);
  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const input = {
    offset: 0,
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
  //   console.log('---------data', data);
  useEffect(() => {
    const _input =
      searcherBarContext.searchWords.length > 0 ? { ...input, search: searcherBarContext.searchWords } : input;
    const getClients = async () => {
      const res = await refetch({ input: _input });
      setFoods(
        res.data?.getFoods.data.map((food) => {
          return {
            amount: 0,
            ingredientName: food.name,
            unit: 'g',
          };
        }),
      );
    };

    const getFoodsForSearcher = async () => {
      const res = await refetch({ input: _input });
      searcherBarContext.setMatchedRecords(res.data.getFoods.data.map((food) => food.name));
    };

    const verifyNewWordToSearch = () => {
      if (searcherBarContext.searchWords.length === 1 && searcherBarContext.recentlyTypedWord) {
        void getFoodsForSearcher();
        searcherBarContext.setRecentlyTypedWord(false);
      }
    };
    const verifyChosedWordsFromSearcher = () => {
      if (searcherBarContext.searchWords.length >= 0 && searcherBarContext.choosedWord) {
        void getClients();
        searcherBarContext.setChoosedWord(false);
      }
    };

    const vefifyFirstDataCallToServer = () => {
      if (data && !searcherBarContext.choosedWord && searcherBarContext.searchWords.length === 0) {
        setFoods(
          data?.getFoods.data.map((food) => {
            return {
              amount: 0,
              ingredientName: food.name,
              unit: 'g',
            };
          }),
        );
      }
    };
    verifyNewWordToSearch();
    verifyChosedWordsFromSearcher();
    vefifyFirstDataCallToServer();
  }, [searcherBarContext.searchWords, searcherBarContext.choosedWord, searcherBarContext.recentlyTypedWord, data]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Accordion expanded={panelExpanded === 'panel1'} onChange={handleAddFoodAncle('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Add food</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SearcherBar />
          {foods.length > 0 && (
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
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
                      <StyledTableCell style={{ padding: '4px' }} align="right">
                        <TextField
                          inputProps={{ style: { fontSize: 'revert' } }}
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
                      <StyledTableCell style={{ padding: '10px' }} component="th" scope="row">
                        {ingredient.ingredientName}
                      </StyledTableCell>
                      <StyledTableCell align="right" style={{ padding: '7px' }}>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            if (ingredient.amount > 0)
                              dispatch(
                                addIngredient({
                                  amount: ingredient.amount,
                                  ingredientName: ingredient.ingredientName,
                                  unit: 'g',
                                }),
                              );
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
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default FoodList;
