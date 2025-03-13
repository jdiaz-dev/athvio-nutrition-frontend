import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import {
  CreateCaloriesRequest,
  CreateCaloriesResponse,
  GetCaloriesRequest,
  GetCaloriesResponse,
  UpdateCaloriesRequest,
  UpdateCaloriesResponse,
} from 'src/modules/patients/patient-console/calories/helpers/calories';
import { CREATE_CALORY, GET_CALORY, UPDATE_CALORY } from 'src/modules/patients/patient-console/calories/adapters/out/PatientQueries';
import { useParams } from 'react-router-dom';

function CaloriesContainer() {
  const [createCaloriesHandler] = useMutation<CreateCaloriesResponse, CreateCaloriesRequest>(CREATE_CALORY);
  const [updateCaloriesHandler] = useMutation<UpdateCaloriesResponse, UpdateCaloriesRequest>(UPDATE_CALORY);

  const { patientId } = useParams();
  const { data, refetch } = useQuery<GetCaloriesResponse, GetCaloriesRequest>(GET_CALORY);
  //   const { protein: _protein } = data?.getCalory;

  const [calories, setCalories] = React.useState(0);
  const [protein, setProtein] = React.useState(0);
  const [carbs, setCarbs] = React.useState(0);
  const [fat, setFat] = React.useState(0);

  React.useEffect(() => {
    const fetchCalory = async () => {
      const res = await refetch({
        input: { patient: patientId as string },
      });
      setCalories(res.data.getCalory.calories as number);
      setProtein(res.data.getCalory.protein as number);
      setCarbs(res.data.getCalory.carbs as number);
      setFat(res.data.getCalory.fat as number);
    };
    fetchCalory();
  }, [patientId]);
  const saveHandler = async () => {
    if (data) {
      const res = await updateCaloriesHandler({
        variables: {
          input: {
            patient: patientId as string,
            calory: data.getCalory._id,
            protein,
            carbs,
            fat,
            calories,
          },
        },
      });
      setCalories(res.data?.updateCalory.calories as number);
      setProtein(res.data?.updateCalory.protein as number);
      setCarbs(res.data?.updateCalory.carbs as number);
      setFat(res.data?.updateCalory.fat as number);
    } else {
      const res = await createCaloriesHandler({
        variables: {
          input: {
            patient: patientId as string,
            protein,
            carbs,
            fat,
            calories,
          },
        },
      });
      setCalories(res.data?.createCalory.calories as number);
      setProtein(res.data?.createCalory.protein as number);
      setCarbs(res.data?.createCalory.carbs as number);
      setFat(res.data?.createCalory.fat as number);
    }
  };
  return (
    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-number"
          label="Protein (g)"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={protein}
          onChange={(e) => setProtein(parseInt(e.target.value))}
        />
        <TextField
          id="outlined-number"
          label="Carbs (g)"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={carbs}
          onChange={(e) => setCarbs(parseInt(e.target.value))}
        />
        <TextField
          id="outlined-number"
          label="Fat (g)"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={fat}
          onChange={(e) => setFat(parseInt(e.target.value))}
        />
        <TextField
          id="outlined-number"
          label="Calories (kcal)"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={calories}
          onChange={(e) => setCalories(parseInt(e.target.value))}
        />
        <Button style={{ marginTop: '1.1%', width: '200px' }} variant="contained" onClick={saveHandler}>
          Save
        </Button>
      </div>
    </Box>
  );
}

export default CaloriesContainer;
