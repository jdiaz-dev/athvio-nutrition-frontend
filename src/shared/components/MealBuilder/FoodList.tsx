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
  InputGetFoods,
} from 'src/shared/components/MealBuilder/food.types';
import SearcherBar from 'src/shared/components/SearcherAndSelector/SearcherBar';
import Paginator from 'src/shared/components/Paginator';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import { GET_AUTOCOMPLETE_FOOD_NAMES, GET_FOODS } from 'src/shared/components/MealBuilder/FoodQueries';
import FoodItem from 'src/shared/components/MealBuilder/FoodItem';
import DatabaseSelector from 'src/shared/components/databaseSelector/DatabaseSelector';
import { DatabasesEnum, FoodDatabases, SpecialPagination } from 'src/shared/Consts';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import SearcherAndSelectorWrapper from 'src/shared/components/SearcherAndSelector/SearcherAndSelectorWrapper';
import { useTranslation } from 'react-i18next';
import { getShortLang } from 'src/shared/internationalization/getShortLang';

function FoodList() {
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
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
  const { length, setLength, offset, setOffset, rowsPerPage, currentPage, setCurrentPage } = usePaginator(5);
  const [database, setDatabase] = useState<string>(FoodDatabases.SYSTEM);

  const [foods, setFoods] = useState<Food[]>([]);
  const [providerFoods, setProviderFoods] = useState<Food[]>([]);
  const [usedSessions, setUsedSessions] = useState<number[]>([]);
  const [session, setSession] = useState<number | null>(null);
  const [nextSession, setNextSession] = useState<number | null>(null);
  const [makeRequestToDefaultDB, setMaqueRequestToDefaultDB] = useState<boolean>(true);

  const [databaseChanged, setDatabaseChanged] = useState<boolean>(false);

  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const language = getShortLang();

  const { loading, refetch } = useQuery<GetFoodsResponse, GetFoodRequest>(GET_FOODS, {
    skip: true,
    fetchPolicy: 'network-only',
  });

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

  const isSpecialPagination = () => database === FoodDatabases.SYSTEM;
  const input: InputGetFoods = {
    professional: authContext.professional,
    offset: offset,
    limit: rowsPerPage,
    foodDatabase: database,
    targetLanguage: language,
  };

  useEffect(() => {
    const manageRequestToDefaultDB = () => database === FoodDatabases.SYSTEM && makeRequestToDefaultDB;
    const isRequestToDefaultDB = manageRequestToDefaultDB();
    let _input: InputGetFoods = searchWords.length > 0 ? { ...input, search: searchWords } : input;

    const getFoodsForNormalPagination = async () => {
      if (authContext.professional || choosedWord || databaseChanged) {
        const res = await refetch({ input: _input });
        setFoods(res.data?.getFoods.data);
        setLength(res.data.getFoods.meta.total);
        setOffset(res.data.getFoods.meta.offset);
      }
    };

    _input = isRequestToDefaultDB && session !== null ? { ..._input, session } : _input;
    const getFoodsForSpecialPagintation = async () => {
      if (authContext.professional && (choosedWord || isRequestToDefaultDB || databaseChanged)) {
        const res = await refetch({ input: _input });

        setProviderFoods(res.data.getFoods.data);
        setNextSession(res.data.getFoods.meta.foodProviderSessions?.nextSession || null);
        setMaqueRequestToDefaultDB(false);
      }
    };

    const getFoods = () => {
      if (isSpecialPagination()) {
        void getFoodsForSpecialPagintation();
      } else {
        void getFoodsForNormalPagination();
      }
      setChoosedWord(false);
      setDatabaseChanged(false);
    };
    getFoods();
  }, [authContext.professional, choosedWord, databaseChanged, makeRequestToDefaultDB, offset]);

  useEffect(() => {
    const getFoodsForSearcher = async () => {
      const autocompleteInput = {
        professional: authContext.professional,
        search: searchWords[0],
        foodDatabase: database,
        targetLanguage: language,
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

    verifyNewWordToSearch();
  }, [searchWords, recentlyTypedWord]);

  useEffect(() => {
    const requestToGetNextPageOfDefaultDB = () => offset === SpecialPagination.LIMIT_RECORDS_IN_MEMORY;
    const paginateUsingArrInMemory = () => offset >= SpecialPagination.OFFSET_RESETED && providerFoods.length > 0;
    const requestToGetPreviousPageOfDefaultDB = () =>
      offset < SpecialPagination.OFFSET_RESETED && providerFoods.length > 0 && nextSession !== null;

    const managePaginationInDefaultDB = () => {
      if (requestToGetNextPageOfDefaultDB()) {
        setUsedSessions([...usedSessions, session === null ? SpecialPagination.FIRST_PAGE_SIMULATION : session]);
        setSession(nextSession);
        setProviderFoods([]);
        setFoods([]);
        setOffset(SpecialPagination.OFFSET_RESETED);
        setMaqueRequestToDefaultDB(true);
      } else if (paginateUsingArrInMemory()) {
        setFoods(providerFoods.slice(offset, offset + rowsPerPage));
        setLength(
          providerFoods.length + usedSessions.length * SpecialPagination.LIMIT_RECORDS_IN_MEMORY + SpecialPagination.TOTAL_NEXT_RECORDS,
        );
      } else if (requestToGetPreviousPageOfDefaultDB()) {
        setSession(usedSessions.length > 1 ? usedSessions[usedSessions.length - 1] : null);
        setUsedSessions(usedSessions.slice(0, usedSessions.length - 1));
        setProviderFoods([]);
        setFoods([]);
        setOffset(SpecialPagination.ALLOWED_OFFSET_LIMIT);
        setMaqueRequestToDefaultDB(true);
      }
    };
    if (isSpecialPagination()) managePaginationInDefaultDB();
  }, [providerFoods, offset]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Accordion expanded={panelExpanded === 'panel1'} onChange={handleAddFoodAncle('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{t('mealBuilder.titles.addFodd')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SearcherAndSelectorWrapper>
            <SearcherBar
              setSearchWords={setSearchWords}
              matchedRecords={matchedRecords}
              setChoosedWord={setChoosedWord}
              setRecentlyTypedWord={setRecentlyTypedWord}
              styles={{ width: '70%' }}
            />
            <DatabaseSelector
              database={database}
              setDatabase={setDatabase}
              setDatabaseChanged={setDatabaseChanged}
              databasesOrigin={DatabasesEnum.FOODS}
            />
          </SearcherAndSelectorWrapper>
          {foods.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell width={'22%'}>{t('mealBuilder.table.amount')}</StyledTableCell>
                    <StyledTableCell width={'38%'}>{t('mealBuilder.table.food')}</StyledTableCell>
                    <StyledTableCell width={'7%'}>{t('mealBuilder.table.proteins')}</StyledTableCell>
                    <StyledTableCell width={'7%'}>{t('mealBuilder.table.carbs')}</StyledTableCell>
                    <StyledTableCell width={'7%'}>{t('mealBuilder.table.fats')}</StyledTableCell>
                    <StyledTableCell width={'7%'}>{t('mealBuilder.table.calories')}</StyledTableCell>
                    <StyledTableCell width={'7%'}></StyledTableCell>
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
