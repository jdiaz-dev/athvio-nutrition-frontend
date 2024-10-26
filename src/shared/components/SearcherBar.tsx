import React, { useEffect } from 'react';
import { Autocomplete, Chip, Stack, TextField } from '@mui/material';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

const inputChange = new Subject();
const inputChange$ = inputChange.asObservable();

function SearcherBar({
  setSearchWords,
  matchedRecords,
  setChoosedWord,
  setRecentlyTypedWord,
}: {
  setSearchWords: React.Dispatch<React.SetStateAction<string[]>>;
  matchedRecords: string[];
  setChoosedWord: React.Dispatch<React.SetStateAction<boolean>>;
  setRecentlyTypedWord: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const onInputChange = (text: string) => {
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
  }, []);

  return (
    <Stack spacing={3} sx={{ width: '100%' }} style={{ marginTop: '12px' }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={matchedRecords}
        getOptionLabel={(option) => {
          return option;
        }}
        onChange={(e, values) => {
          setSearchWords(values as string[]);
          setChoosedWord(true);
        }}
        freeSolo
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInputChange={(e: any, value: string) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (value !== '') onInputChange(value);
        }}
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
