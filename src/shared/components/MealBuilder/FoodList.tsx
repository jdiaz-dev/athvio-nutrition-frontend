/* eslint-disable indent */
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import TableBody from '@mui/material/TableBody';
import { Paper, Table, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import {
  Food,
  GetAutocompleteFoodNamesRequest,
  GetAutocompleteFoodNamesResponse,
  GetFoodRequest,
  GetFoodsResponse,
} from 'src/shared/components/MealBuilder/food.types';
import SearcherBar from 'src/shared/components/SearcherBar';
import Paginator from 'src/shared/components/Paginator';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import { GET_AUTOCOMPLETE_FOOD_NAMES, GET_FOODS } from 'src/shared/components/MealBuilder/FoodQueries';
import FoodItem from 'src/shared/components/MealBuilder/FoodItem';
import { ProfessionalIdContext } from 'src/App';
import DatabaseSelector from 'src/shared/components/MealBuilder/DatabaseSelector';
import { defaultDatabase } from 'src/shared/Consts';

function FoodList() {
  const professionalIdContext = useContext(ProfessionalIdContext);
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
  const [database, setDatabase] = useState(defaultDatabase);

  const [foods, setFoods] = useState<Food[]>([]);
  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const input = {
    professional: professionalIdContext.professional,
    offset: offset,
    limit: 5,
    foodDatabase: database,
  };

  const { data, loading, refetch } = useQuery<GetFoodsResponse, GetFoodRequest>(
    GET_FOODS,

    database !== defaultDatabase
      ? {
          variables: {
            input,
          },
          fetchPolicy: 'network-only',
        }
      : database === defaultDatabase && (offset === 0 || offset % 20 === 0)
      ? {
          variables: {
            input,
          },
          fetchPolicy: 'network-only',
        }
      : {
          skip: true,
        },
  );

  const { refetch: refetchAutocomplete } = useQuery<GetAutocompleteFoodNamesResponse, GetAutocompleteFoodNamesRequest>(
    GET_AUTOCOMPLETE_FOOD_NAMES,
    {
      skip: true,
      fetchPolicy: 'network-only',
    },
  );

  const handleAddFoodAncle = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };
  useEffect(() => {
    const _input = searchWords.length > 0 ? { ...input, search: searchWords } : input;
    const getFoods = async () => {
      const res = await refetch({ input: _input });

      setFoods(res.data?.getFoods.data);
      setLength(res.data.getFoods.meta.total);
      setOffset(res.data.getFoods.meta.offset);
    };

    const getFoodsForSearcher = async () => {
      const autocompleteInput = {
        professional: professionalIdContext.professional,
        search: searchWords[0],
        foodDatabase: database,
      };
      const foodNames = await refetchAutocomplete({ input: autocompleteInput });
      setMatchedRecords(foodNames.data.getAutoCompleteFoodNames.foodNames);
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

    /* const manageRowsForDatabase = () => {
      if(database === defaultDatabase){

      }
    } */
    const vefifyFirstDataCallToServer = () => {
      if (data && !choosedWord && searchWords.length === 0) {
        setFoods(data?.getFoods.data);

        setLength(data.getFoods.meta.total);
        setOffset(data.getFoods.meta.offset);
        setRowsPerPage(5);
      }
    };
    verifyNewWordToSearch();
    verifyChosedWordsFromSearcher();
    vefifyFirstDataCallToServer();
  }, [searchWords, choosedWord, recentlyTypedWord, database, data]);

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
          <DatabaseSelector database={database} setDatabase={setDatabase} />
          {foods.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell width={'15%'}>Amount</StyledTableCell>
                    <StyledTableCell>Food</StyledTableCell>
                    <StyledTableCell>Protein</StyledTableCell>
                    <StyledTableCell>Carbs</StyledTableCell>
                    <StyledTableCell>Fat</StyledTableCell>
                    <StyledTableCell>Calories</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ maxHeight: '10px' }}>
                  {foods.map((food, index) => {
                    return <FoodItem key={index} food={food} />;
                  })}
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
