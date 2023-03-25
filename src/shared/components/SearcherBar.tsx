import React, { useContext, useEffect } from 'react';
import { Autocomplete, Chip, Stack, TextField } from '@mui/material';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearcherBarContext } from 'src/App';

const inputChange = new Subject();
const inputChange$ = inputChange.asObservable();

function SearcherBar() {
  const searcherBarContext = useContext(SearcherBarContext);

  const onInputChange = (text: string) => {
    inputChange.next(text);
  };

  useEffect(() => {
    const subscription = inputChange$.pipe(debounceTime(500)).subscribe((val) => {
      searcherBarContext.setRecentlyTypedWord(true);
      searcherBarContext.setSearchWords([val] as string[]);
    });

    return () => {
      return subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={searcherBarContext.matchedRecords}
          getOptionLabel={(option) => {
            return option;
          }}
          onChange={(e, values) => {
            searcherBarContext.setSearchWords(values as string[]);
            searcherBarContext.setChoosedWord(true);
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
            return <TextField {...params} label="filterSelectedOptions" placeholder="Favorites" />;
          }}
        />
      </Stack>
    </div>
  );
}

export default SearcherBar;
