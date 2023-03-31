import React, { useContext, useState } from 'react';
// eslint-disable-next-line max-len
import CreateUpdateCustomMealDialog from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/CreateUpdateCustomMealDialog';
import { CustomMealBody } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { useCustomMeal } from 'src/modules/professionals/custom-meals/adapters/out/CustomMealActions';
import { ProfessionalIdContext } from 'src/App';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';

function CustomMeal(customMeal: CustomMealBody) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [openCreateUpdateCustomMealDialog, setOpenCreateUpdateCustomMealDialog] = useState(false);
  const { deleteCustomMeal } = useCustomMeal();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const deleteCustomMealHandler = () => {
    void deleteCustomMeal({
      professional: professionalIdContext.professional,
      customMeal: customMeal._id || '',
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  return (
    <>
      <StyledTableRow
        key={customMeal.name}
        style={{ border: '2px solid red' }}
        // onClick={() => setOpenCreateUpdateCustomMealDialog(true)}
      >
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomMealDialog(true)} align="right">
          {customMeal.name}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomMealDialog(true)} align="right">
          {customMeal.totalProtein}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomMealDialog(true)} align="right">
          {customMeal.totalCarbs}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomMealDialog(true)} align="right">
          {customMeal.totalFat}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomMealDialog(true)} align="right">
          {customMeal.totalCalories}
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
                      onClick={deleteCustomMealHandler}
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

      {openCreateUpdateCustomMealDialog && (
        <CreateUpdateCustomMealDialog
          openCreateUpdateCustomMealDialog={openCreateUpdateCustomMealDialog}
          setOpenCreateUpdateCustomMealDialog={setOpenCreateUpdateCustomMealDialog}
          _customMeal={customMeal}
        />
      )}
    </>
  );
}

export default CustomMeal;
