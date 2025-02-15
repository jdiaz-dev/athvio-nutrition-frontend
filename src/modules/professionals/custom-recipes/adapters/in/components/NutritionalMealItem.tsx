import React, { useContext, useState } from 'react';
// eslint-disable-next-line max-len
import CreateUpdateNutritionalMealDialog from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateNutritionalMealDialog/CreateUpdateNutritionalMealDialog';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { useNutritionalMeal } from 'src/modules/professionals/custom-recipes/adapters/out/NutritionalMealActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { NutritionalMealBody } from 'src/modules/professionals/custom-recipes/adapters/out/nutritionalMeal.types';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function NutritionalMealItem(nutritionalMeal: NutritionalMealBody) {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [openCreateUpdateNutritionalMealDialog, setOpenCreateUpdateNutritionalMealDialog] = useState(false);
  const { deleteNutritionalMeal } = useNutritionalMeal();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const deleteNutritionalMealHandler = () => {
    void deleteNutritionalMeal({
      professional: authContext.professional,
      nutritionalMeal: nutritionalMeal._id || '',
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  return (
    <>
      <StyledTableRow key={nutritionalMeal.name}>
        <StyledTableCell onClick={() => setOpenCreateUpdateNutritionalMealDialog(true)} align="right">
          {nutritionalMeal.name}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateNutritionalMealDialog(true)} align="right">
          {nutritionalMeal.macros.protein}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateNutritionalMealDialog(true)} align="right">
          {nutritionalMeal.macros.carbs}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateNutritionalMealDialog(true)} align="right">
          {nutritionalMeal.macros.fat}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateNutritionalMealDialog(true)} align="right">
          {nutritionalMeal.macros.calories}
        </StyledTableCell>
        <StyledTableCell align="right">
          {/*  <Box
            sx={{
              '& > :not(style)': {
                m: 1,
              },
            }}
          >
            <IconButton aria-label="Example">
              <FontAwesomeIcon icon={faEllipsisV} />
            </IconButton>
          </Box> */}
          <Grid item xs={8}>
            <DeleteSharpIcon onClick={handleAnchorOpen} />
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
        </StyledTableCell>
      </StyledTableRow>

      {openCreateUpdateNutritionalMealDialog && (
        <CreateUpdateNutritionalMealDialog
          openCreateUpdateNutritionalMealDialog={openCreateUpdateNutritionalMealDialog}
          setOpenCreateUpdateNutritionalMealDialog={setOpenCreateUpdateNutritionalMealDialog}
          _nutritionalMeal={nutritionalMeal}
        />
      )}
    </>
  );
}

export default NutritionalMealItem;
