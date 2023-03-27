import React, { createContext, StrictMode, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { checkAuthentication, getUserFromLocalStorage } from './shared/helpers/LocalStorage';
// import LogIn from './modules/security/security/adapters/in/components/LogIn';
import ClientsContainer from './modules/clients/clients/adapters/in/components/ClientsContainer';
import ProgramsContainer from './modules/professionals/programs/adapters/in/ProgramsContainer';
import { Drawer } from './shared/components/Drawer';
import { SignUp } from './modules/security/users/adapters/in/SignUp';
import { LogIn } from 'src/modules/security/security/adapters/in/LogIn';
import Test from 'src/modules/clients/clients/adapters/in/components/Test';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserType } from 'src/shared/Consts';
import { ClientGroup } from 'src/shared/types';
import CustomMealsContainer from 'src/modules/professionals/custom-meals/adapters/in/components/CustomMealsContainer';

/* const loginStyles = makeStyles({
  container: {
    height: '100vh',
    position: 'relative',
  },
  login: {
    width: '100%',
  },
});
 */

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isAuthenticated: true, setIsAuthenticated: useState });

export const ProfessionalIdContext = createContext<{
  professionalId: string;
  setProfessionalId: React.Dispatch<React.SetStateAction<string>>;
}>({ professionalId: '', setProfessionalId: useState });

export const ClientGroupsContext = createContext<{
  clientGroupList: ClientGroup[];
  setClientGroupList: React.Dispatch<React.SetStateAction<ClientGroup[]>>;
}>({ clientGroupList: [], setClientGroupList: useState });

export const ReloadClientListContext = createContext<{
  reloadClientList: boolean;
  setReloadClientList: React.Dispatch<React.SetStateAction<boolean>>;
}>({ reloadClientList: false, setReloadClientList: useState });

export const SearcherBarContext = createContext<{
  searchWords: string[];
  setSearchWords: React.Dispatch<React.SetStateAction<string[]>>;
  matchedRecords: string[];
  setMatchedRecords: React.Dispatch<React.SetStateAction<string[]>>;
  choosedWord: boolean;
  setChoosedWord: React.Dispatch<React.SetStateAction<boolean>>;
  recentlyTypedWord: boolean;
  setRecentlyTypedWord: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  searchWords: [],
  setSearchWords: useState,
  matchedRecords: [],
  setMatchedRecords: useState,
  choosedWord: false,
  setChoosedWord: useState,
  recentlyTypedWord: false,
  setRecentlyTypedWord: useState,
});

export const FoddAddedContext = createContext<{
  foodAdded: boolean;
  setFoodAdded: React.Dispatch<React.SetStateAction<boolean>>;
}>({ foodAdded: false, setFoodAdded: useState });

export const PaginationContext = createContext<{
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}>({
  length: 0,
  setLength: useState,
  offset: 0,
  setOffset: useState,
  rowsPerPage: 0,
  setRowsPerPage: useState,
  currentPage: 0,
  setCurrentPage: useState,
});

function App() {
  // const loginClasses = loginStyles;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [professionalId, setProfessionalId] = useState('');
  const [clientGroupList, setClientGroupList] = useState<ClientGroup[]>([]);
  const [reloadClientList, setReloadClientList] = useState(false);

  //for searcher
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [matchedRecords, setMatchedRecords] = useState<string[]>([]);
  const [choosedWord, setChoosedWord] = useState(false);
  const [foodAdded, setFoodAdded] = useState(false);

  //for food added from foodLis
  const [recentlyTypedWord, setRecentlyTypedWord] = useState(false);

  //for pagination
  const [length, setLength] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const user = getUserFromLocalStorage();

  useEffect(() => {
    setIsAuthenticated(checkAuthentication());
    setProfessionalId(user.userType === UserType.PROFESSIONAL ? user._id : '');
    // return () => {};
  }, [isAuthenticated]);

  const authContext = {
    isAuthenticated,
    setIsAuthenticated,
  };

  const professionalContext = {
    professionalId,
    setProfessionalId,
  };
  const clientGroupContext = {
    clientGroupList,
    setClientGroupList,
  };

  const reloadClientListContext = {
    reloadClientList,
    setReloadClientList,
  };

  const communicationSearcherLister = {
    searchWords,
    setSearchWords,
    matchedRecords,
    setMatchedRecords,
    choosedWord,
    setChoosedWord,
    recentlyTypedWord,
    setRecentlyTypedWord,
  };

  const foddAddedContext = {
    foodAdded,
    setFoodAdded,
  };
  const paginationContext = {
    length,
    setLength,
    offset,
    setOffset,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    setCurrentPage,
  };

  return (
    <div className="App">
      <StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthContext.Provider value={authContext}>
            <ProfessionalIdContext.Provider value={professionalContext}>
              <SearcherBarContext.Provider value={communicationSearcherLister}>
                <ClientGroupsContext.Provider value={clientGroupContext}>
                  <ReloadClientListContext.Provider value={reloadClientListContext}>
                    <FoddAddedContext.Provider value={foddAddedContext}>
                      <PaginationContext.Provider value={paginationContext}>
                        <Routes>
                          {/* <Route path="/" element={<SignUp />} /> */}
                          <Route path="*" element={<LogIn />} />
                          <Route path="signup" element={<SignUp />} />

                          {/* wrapping entire al  routes between Routes  */}
                          {/*
                      {!isAuthenticated && (
                        <Route
                          path="/login"
                          element={
                            <div>
                              <LogIn />
                            </div>
                          }
                        />p
                      )} */}

                          {/* <Route path="sidenav" element={<SideNav />}> */}
                          {
                            /* isAuthenticated && */ <Route path="sidenav" element={<Drawer />}>
                              <Route path="clients" element={<ClientsContainer />} />
                              {/* <Route path="Abridores" element={<OpenersContainer />} /> */}
                              <Route path="programs" element={<ProgramsContainer />} />
                              <Route path="Custom Meals" element={<CustomMealsContainer />} />
                              <Route path="test" element={<Test />} />
                            </Route>
                          }

                          {/* default route */}
                          {/* <Route path="*" element={<Navigate to={isAuthenticated ? '/sidenav/Tickets' : '/login'} />} /> */}
                        </Routes>
                      </PaginationContext.Provider>
                    </FoddAddedContext.Provider>
                  </ReloadClientListContext.Provider>
                </ClientGroupsContext.Provider>
              </SearcherBarContext.Provider>
            </ProfessionalIdContext.Provider>
          </AuthContext.Provider>
        </LocalizationProvider>
      </StrictMode>
    </div>
  );
}

export default App;

/*
  - implement remove and edit ingredient previously added

*/
