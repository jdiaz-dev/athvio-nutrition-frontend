import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { InvalidCountries, REST_COUNTRIES_URL } from 'src/shared/Consts';
import { CountryList } from 'src/shared/types';

function CountryCodeSelect({
  countryCode,
  setCountryCode,
}: {
  countryCode: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCountryCode: (countryCode: any) => any;
}) {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<CountryList[]>([]);
  const [isSearchingCountry, setIsSearchingCountry] = useState(false);

  useEffect(() => {
    const getCountries = () => {
      fetch(REST_COUNTRIES_URL)
        .then((response) => response.json())
        .then((countries: CountryList[]) => {
          countries.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
          setCountries(countries);
          dispatch(setCountryCode(`${countries[0].idd.root}${countries[0].idd.suffixes[0]}`));
        })
        .catch((error) => console.log('-----error', error));
    };
    getCountries();
  }, []);

  useEffect(() => {
    let wordToSearch = '';
    function handleCountryCodeChange(ke: KeyboardEvent) {
      wordToSearch += ke.key;

      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().startsWith(wordToSearch.toLowerCase()),
      );
      if (filtered.length > 0) {
        dispatch(setCountryCode(`${countries[0].idd.root}${countries[0].idd.suffixes[0]}`));
      }

      setTimeout(() => {
        wordToSearch = '';
      }, 1500);
    }
    if (isSearchingCountry) {
      document.addEventListener('keydown', handleCountryCodeChange, true);
    }

    return () => document.removeEventListener('keydown', handleCountryCodeChange, true);
  }, [isSearchingCountry]);

  const cleanListenerHandler = () => {
    setIsSearchingCountry(false);
  };

  const searchCountryHandler = () => {
    setIsSearchingCountry(true);
  };

  return (
    <div>
      {countries[0] && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Phone</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countryCode}
              required
              onOpen={searchCountryHandler}
              onClose={cleanListenerHandler}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              onChange={(e) => dispatch(setCountryCode(e.target.value))}
            >
              {countries.map(
                (country, index) =>
                  country.name.common !== InvalidCountries.ANTARTICA &&
                  country.name.common !== InvalidCountries.INVALID_ISLANDS && (
                    <MenuItem key={index} value={`${country.idd.root}${country.idd.suffixes[0]}`}>
                      <img src={country.flags.svg} width="25" height="15" />
                      {` ${country.name.common} ${country.idd.root}${country.idd.suffixes[0]}`}
                    </MenuItem>
                  ),
              )}
            </Select>
          </FormControl>
        </Box>
      )}
    </div>
  );
}

export default CountryCodeSelect;
