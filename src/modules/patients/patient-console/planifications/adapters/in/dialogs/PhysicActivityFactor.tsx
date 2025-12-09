import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Typography,
  CardActionArea,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import * as PlanificationSlice from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { FormulaGroup, Parameter, ValueCase } from 'src/modules/nutrition/formulas/types/formula';

const getFactorForGender = (gender: 'male' | 'female', opt: ValueCase[]) => {
  return opt.find((vc) => vc.case === gender)?.value as number;
};
function PhysicActivityFactor({ selectedFormulaGroup }: { selectedFormulaGroup: FormulaGroup | null }) {
  const dispatch = useDispatch();
  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification);
  const [selected, setSelected] = useState<Parameter | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popOpen = Boolean(anchorEl);
  const id = popOpen ? 'activity-popover' : undefined;

  const factor = getFactorForGender(
    (planificationState.patientInformation.gender as 'male' | 'female') ?? 'female',
    selected ? selected.valueCases : [],
  );

  useEffect(() => {
    const defaultOption = selectedFormulaGroup?.parameters[0];
    if (defaultOption) {
      setSelected(defaultOption);
      dispatch(
        PlanificationSlice.modifyActivityFactor({
          physicActivityFactor: defaultOption.valueCases[0].value,
          physicActivityName: defaultOption.spanishParameterName,
        }),
      );
    }
  }, [selectedFormulaGroup]);

  return (
    <Stack spacing={1}>
      {selected !== null && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ minWidth: 190 }}>
            {selectedFormulaGroup?.parameterDescription}:
          </Typography>

          <Tooltip title="Cambiar nivel de actividad">
            <Stack
              role="button"
              tabIndex={0}
              onClick={(e) => setAnchorEl(e.currentTarget as HTMLElement)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setAnchorEl(e.currentTarget as HTMLElement)}
              sx={(theme) => ({
                'px': 1.25,
                'py': 0.5,
                'borderRadius': 2,
                'border': `1px solid ${theme.palette.divider}`,
                'cursor': 'pointer',
                'userSelect': 'none',
                '&:hover': { backgroundColor: theme.palette.action.hover },
              })}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Typography variant="body2" fontWeight={600}>
                {selected.spanishParameterName}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                • {planificationState.patientInformation.physicActivityFactor.toFixed(2)}
              </Typography>
            </Stack>
          </Tooltip>

          <Popover
            id={id}
            open={popOpen}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{ sx: { p: 2, width: 520, maxWidth: '90vw' } }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Selecciona tu nivel de factor de actividad física:
            </Typography>

            <Grid container spacing={1.5}>
              {selectedFormulaGroup?.parameters.map((option) => {
                const isSelected = option.spanishParameterName === selected.spanishParameterName;
                const factorValue = getFactorForGender(
                  (planificationState.patientInformation.gender as 'male' | 'female') ?? 'female',
                  option.valueCases,
                );

                return (
                  <Grid key={option.spanishParameterName} item xs={12} sm={6}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderColor: isSelected ? 'primary.main' : 'divider',
                        boxShadow: isSelected ? 3 : 0,
                      }}
                    >
                      <CardActionArea
                        onClick={() => {
                          setSelected(option);
                          dispatch(
                            PlanificationSlice.modifyActivityFactor({
                              physicActivityFactor: factorValue,
                              physicActivityName: option.spanishParameterName,
                            }),
                          );
                          setAnchorEl(null);
                        }}
                      >
                        <CardContent>
                          <Stack direction="row" alignItems="start" spacing={1}>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1">{option.spanishParameterName}</Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                                {option.description}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block' }}>
                                Mujeres: <b>{option.valueCases[0].value}</b> &nbsp;|&nbsp; Hombres: <b>{option.valueCases[1].value}</b>
                              </Typography>
                            </Box>
                            {isSelected && <CheckCircleRoundedIcon color="primary" fontSize="small" />}
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Popover>
        </Stack>
      )}

      <Typography variant="body2">
        Calorías totales (GET): <b>{planificationState.configuredMacros.totalCalories} kcal</b>
      </Typography>

      <TextField
        label="Calorias para tu plan"
        value={planificationState.configuredMacros.planCalories}
        type="number"
        fullWidth
        inputProps={{ min: 0, step: 0.1 }}
        InputProps={{ endAdornment: <InputAdornment position="end">cal.</InputAdornment> }}
        onChange={(e) => {
          dispatch(PlanificationSlice.modifyPlanCalories(parseFloat(e.target.value)));
        }}
      />
    </Stack>
  );
}

export default PhysicActivityFactor;
