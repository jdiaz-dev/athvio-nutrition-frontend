import React from 'react';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { TextFields } from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from 'src/modules/clients/clients/adapters/out/ClientQueries';

function ClientSearchBar() {
  /* const { data, loading, refetch } = useQuery<GetClientResponse, GetClientsRequest>(GET_CLIENTS, {
    variables: {
      input,
    },
  }); */

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
  ];

  return (
    <div>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={top100Films}
          getOptionLabel={(option) => {
            console.log('---------option', option);
            return option.title;
          }}
          defaultValue={[top100Films[1]]}
          filterSelectedOptions
          renderInput={(params) => {
            // console.log('---------param', params);
            return <TextField {...params} label="filterSelectedOptions" placeholder="Favorites" />;
          }}
        />
      </Stack>
    </div>
  );
}

export default ClientSearchBar;
