import React, { useContext, useEffect, useState } from 'react';
import { useNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealActions';
import { useSelector } from 'react-redux';
import NutritionalMealItem from 'src/modules/professionals/nutritional-meals/adapters/in/components/NutritionalMealItem';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import SearcherBar from 'src/shared/components/SearcherAndSelector/SearcherBar';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { GraphQLInput, ReduxStates } from 'src/shared/types/types';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import Paginator from 'src/shared/components/Paginator';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { DatabasesEnum, NutritionalMealDatabasesEnum } from 'src/shared/Consts';
import DatabaseSelector from 'src/shared/components/databaseSelector/DatabaseSelector';
import SearcherAndSelectorWrapper from 'src/shared/components/SearcherAndSelector/SearcherAndSelectorWrapper';
import { getShortLang } from 'src/shared/internationalization/getShortLang';

function NutritionalMealList() {
  const nutritionalMealList = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMeals);

  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const currentLang = getShortLang();

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
  const { length, setLength, offset, setOffset, rowsPerPage, currentPage, setCurrentPage } = usePaginator(6);
  const [database, setDatabase] = useState(NutritionalMealDatabasesEnum.ALL as string);

  const { getNutritionalMeals } = useNutritionalMeal();
  const input: GraphQLInput = {
    professional: authContext.professional,
    offset: searchWords.length == 1 ? 0 : offset,
    limit: rowsPerPage,
  };
  if (searchWords.length > 0) input.search = searchWords;

  useEffect(() => {
    const fetchNutritionalMeals = async () => {
      await getNutritionalMeals({ ...input, database: database as NutritionalMealDatabasesEnum, language: currentLang });
    };

    const getNutritionalMealsFn = () => {
      if (authContext.professional || reloadRecordListContext.reloadRecordList || choosedWord) {
        void fetchNutritionalMeals();
        setChoosedWord(false);
        reloadRecordListContext.setReloadRecordList(false);
      }
    };
    getNutritionalMealsFn();
  }, [authContext.professional, reloadRecordListContext.reloadRecordList, choosedWord, offset, database]);

  useEffect(() => {
    const getPatientsForSearcher = async () => {
      await getNutritionalMeals({ ...input, database: NutritionalMealDatabasesEnum.ALL, language: currentLang });
      if (nutritionalMealList) setMatchedRecords(nutritionalMealList.data.map((meal) => meal.name));
      setRecentlyTypedWord(false);
    };

    if (searchWords.length === 1 && recentlyTypedWord) {
      getPatientsForSearcher();
    }

    void getPatientsForSearcher();
  }, [searchWords, recentlyTypedWord]);

  useEffect(() => {
    if (nutritionalMealList) {
      setLength(nutritionalMealList.meta.total);
      if (choosedWord && nutritionalMealList.meta.total <= rowsPerPage) {
        setCurrentPage(0);
      }
    }
  }, [nutritionalMealList]);
  return (
    <>
      <SearcherAndSelectorWrapper>
        <SearcherBar
          setSearchWords={setSearchWords}
          matchedRecords={matchedRecords}
          setChoosedWord={setChoosedWord}
          setRecentlyTypedWord={setRecentlyTypedWord}
          styles={{ width: '70%' }}
        />
        <DatabaseSelector database={database} setDatabase={setDatabase} databasesOrigin={DatabasesEnum.NUTRITIONAL_MEALS} label="Source" />
      </SearcherAndSelectorWrapper>

      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', marginTop: '10px' }}>
        {nutritionalMealList &&
          nutritionalMealList?.data.map((meal, index) => (
            <React.Fragment key={index}>
              <NutritionalMealItem {...meal} />
            </React.Fragment>
          ))}
      </div>
      <Paginator
        length={length}
        offset={offset}
        setOffset={setOffset}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default NutritionalMealList;
