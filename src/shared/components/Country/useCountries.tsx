import React, { useEffect, useState } from 'react';
import { REST_COUNTRIES_URL } from 'src/shared/Consts';
import { CountryList } from 'src/shared/types/types';

function useCountries() {
  const [countries, setCountries] = useState<CountryList[]>([]);

  useEffect(() => {
    const getCountries = () => {
      fetch(REST_COUNTRIES_URL)
        .then((response) => {
          return response.json();
        })
        .then((countries: CountryList[]) => {
          countries.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
          setCountries(countries);
          // setCountryCode(`${countries[0].idd.root}${countries[0].idd.suffixes[0]}`);
        })
        .catch((error) => console.log('-----error', error));
    };
    getCountries();
  }, []);
  return { countries };
}

export default useCountries;
