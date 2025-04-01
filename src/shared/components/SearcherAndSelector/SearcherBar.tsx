import React, { useEffect } from 'react';
import { Autocomplete, Chip, Stack, TextField } from '@mui/material';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

function SearcherBar({
  setSearchWords,
  matchedRecords,
  setChoosedWord,
  setRecentlyTypedWord,
  styles,
  withMultipleOption = true,
}: {
  setSearchWords: React.Dispatch<React.SetStateAction<string[]>>;
  matchedRecords: string[];
  setChoosedWord: React.Dispatch<React.SetStateAction<boolean>>;
  setRecentlyTypedWord: React.Dispatch<React.SetStateAction<boolean>>;
  styles?: React.CSSProperties;
  withMultipleOption?: boolean;
}) {
  const inputChange = new Subject();
  const inputChange$ = inputChange.asObservable();

  const inputChangeHandler = (e: any, text: string) => {
    inputChange.next(text);
  };
  useEffect(() => {
    const subscription = inputChange$.pipe(debounceTime(500)).subscribe((val) => {
      setRecentlyTypedWord(true);
      setSearchWords([val] as string[]);
    });

    return () => {
      return subscription.unsubscribe();
    };
  }, [inputChange]);

  return (
    <Stack spacing={1} style={{ width: '100%', ...styles }}>
      <Autocomplete
        multiple={withMultipleOption ? true : false}
        id="tags-outlined"
        options={matchedRecords}
        getOptionLabel={(option) => {
          return option;
        }}
        onChange={(e, values) => {
          if (Array.isArray(values)) {
            setSearchWords(values);
          } else if (typeof values === 'string') {
            setSearchWords([values]);
          }
          setChoosedWord(true);
        }}
        freeSolo={withMultipleOption ? true : false}
        onInputChange={inputChangeHandler}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => {
          return <TextField {...params} label="search" />;
        }}
      />
    </Stack>
  );
}

export default SearcherBar;
