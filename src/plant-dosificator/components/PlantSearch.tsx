import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import type { Plant } from '../types/plant.types';

interface PlantSearchProps {
  plantas: Plant[];
  selectedPlant: Plant | null;
  onSelectPlant: (plant: Plant | null) => void;
}

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/**
 * Section 1: Buscador de plantas medicinales.
 * Allows searching by common name, scientific name, or other regional
 * names, and shows the matched common + scientific name.
 */
const PlantSearch: React.FC<PlantSearchProps> = ({ plantas, selectedPlant, onSelectPlant }) => {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <LocalFloristIcon color="primary" />
        <Typography variant="h6" component="h2">
          Buscador de plantas medicinales
        </Typography>
      </Box>

      <Autocomplete
        options={plantas}
        value={selectedPlant}
        onChange={(_event, newValue) => onSelectPlant(newValue)}
        getOptionLabel={(option) => `${option.com} (${option.s})`}
        filterOptions={(options, state) => {
          const query = normalize(state.inputValue);
          if (!query) return options;
          return options.filter((option) => {
            const haystack = normalize(
              `${option.com} ${option.s} ${option.otr ?? ''}`
            );
            return haystack.includes(query);
          });
        }}
        isOptionEqualToValue={(option, value) => option.s === value.s}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.s}>
            <Box>
              <Typography variant="body1">{option.com}</Typography>
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                {option.s}
              </Typography>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nombre común o nombre científico"
            placeholder="Ej. Manzanilla, Toronjil, Mentha piperita..."
            fullWidth
          />
        )}
        noOptionsText="No se encontró ninguna planta con ese nombre"
      />

      {selectedPlant && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            {selectedPlant.com}
          </Typography>
          <Typography variant="body2" fontStyle="italic" sx={{ opacity: 0.9 }}>
            {selectedPlant.s} · {selectedPlant.fam}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default PlantSearch;
