import React, { useContext, useState } from 'react';
// eslint-disable-next-line max-len
import CreateUpdateNutritionalMealDialog from 'src/modules/professionals/nutritional-meals/adapters/in/dialogs/CreateUpdateNutritionalMealDialog/CreateUpdateNutritionalMealDialog';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { useNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { NutritionalMealBody } from 'src/modules/professionals/nutritional-meals/adapters/out/nutritionalMeal';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { MealSourceEnum } from 'src/shared/Consts';
import EnablerEditionWrapper from 'src/shared/components/wrappers/EnablerEditionWrapper/EnablerEditionWrapper';

function NutritionalMealItem(nutritionalMeal: NutritionalMealBody) {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const [openCreateUpdateNutritionalMealDialog, setOpenCreateUpdateNutritionalMealDialog] = useState(false);
  const { deleteNutritionalMeal } = useNutritionalMeal();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl === null ? false : anchorEl);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const nutritionalMealClickedHandler = () => {
    setOpenCreateUpdateNutritionalMealDialog(true);
  };
  const deleteNutritionalMealHandler = () => {
    void deleteNutritionalMeal({
      professional: authContext.professional,
      nutritionalMeal: nutritionalMeal.uuid || '',
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  return (
    <>
      <Card sx={{ width: '49.5%', display: 'flex', marginBottom: '10px', cursor: 'pointer' }}>
        <CardMedia
          onClick={nutritionalMealClickedHandler}
          component="img"
          height="200"
          style={{ maxWidth: '50%' }}
          image={nutritionalMeal.image || ''}
        />

        <Box sx={{ padding: 0, width: '50%' }}>
          <CardHeader
            action={
              <EnablerEditionWrapper enableEdition={nutritionalMeal.source !== MealSourceEnum.SYSTEM}>
                <IconButton aria-label="settings">
                  <Grid item xs={8}>
                    <DeleteSharpIcon onClick={handleAnchorOpen} style={{ cursor: 'pointer' }} />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleAnchorClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem>
                        <div>
                          <div>Delete this meal?</div>
                          <div>
                            <Button
                              id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleAnchorClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={deleteNutritionalMealHandler}
                            >
                              Delete meal
                            </Button>
                          </div>
                        </div>
                      </MenuItem>
                    </Menu>
                  </Grid>
                </IconButton>
              </EnablerEditionWrapper>
            }
            title={nutritionalMeal.name}
          />
          <Typography>
            Source: {nutritionalMeal.source === MealSourceEnum.PROFESSIONAL ? 'CUSTOM MEALS' : nutritionalMeal.source}
          </Typography>
          <CardContent
            sx={{
              padding: '5px',
              paddingTop: '15px',
            }}
            onClick={nutritionalMealClickedHandler}
          >
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Protein</TableCell>
                    <TableCell align="center">Carbs</TableCell>
                    <TableCell align="center" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                      Fat
                    </TableCell>
                    <TableCell align="center">Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    '& .MuiTableRow-root:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <TableRow key={nutritionalMeal.name}>
                    <TableCell onClick={nutritionalMealClickedHandler} align="center">
                      {nutritionalMeal.macros.protein} g
                    </TableCell>
                    <TableCell onClick={nutritionalMealClickedHandler} align="center">
                      {nutritionalMeal.macros.carbs} g
                    </TableCell>
                    <TableCell onClick={nutritionalMealClickedHandler} align="center">
                      {nutritionalMeal.macros.fat} g
                    </TableCell>
                    <TableCell onClick={nutritionalMealClickedHandler} align="center">
                      {nutritionalMeal.macros.calories} cal
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Box>
      </Card>

      {openCreateUpdateNutritionalMealDialog && (
        <CreateUpdateNutritionalMealDialog
          openCreateUpdateNutritionalMealDialog={openCreateUpdateNutritionalMealDialog}
          setOpenCreateUpdateNutritionalMealDialog={setOpenCreateUpdateNutritionalMealDialog}
          _nutritionalMeal={nutritionalMeal}
          dialogTitle={nutritionalMeal.source === MealSourceEnum.SYSTEM ? 'Comida del sistema' : 'Actualizar comida'}
        />
      )}
    </>
  );
}

export default NutritionalMealItem;
