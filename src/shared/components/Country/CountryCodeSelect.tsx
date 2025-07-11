import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { InvalidCountries } from 'src/shared/Consts';
import { makeStyles } from 'tss-react/mui';
import useCountries from 'src/shared/components/Country/useCountries';

const cardStyles = makeStyles()(() => {
  return {
    container: {
      width: '100%',
      margin: '0px auto',
      marginTop: '15px',
    },
  };
});

function CountryCodeSelect({
  countryCode,
  setCountryCode,
  setCountryName,
}: {
  countryCode: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCountryCode: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCountryName: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { countries } = useCountries();

  const selectCountryHandler = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    const index = value.indexOf(' ');
    const countryCode = value.slice(0, index);
    const countryName = value.slice(index + 1);
    setCountryCode(countryCode);
    setCountryName(countryName);
  };

  const { classes } = cardStyles();
  return (
    <div className={classes.container}>
      {countries[0] && (
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={countryCode} onChange={selectCountryHandler}>
              {countries.map(
                (country, index) =>
                  country.name.common !== InvalidCountries.ANTARTICA &&
                  country.name.common !== InvalidCountries.INVALID_ISLANDS && (
                    <MenuItem key={index} value={`${country.idd.root}${country.idd.suffixes[0]} ${country.name.common}`}>
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
