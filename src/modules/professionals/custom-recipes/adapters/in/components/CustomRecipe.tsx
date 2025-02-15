import React, { useContext, useState } from 'react';
// eslint-disable-next-line max-len
import CreateUpdateCustomRecipeDialog from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/CreateUpdateCustomRecipeDialog';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { useCustomRecipe } from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { NutritionalMealBody } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function CustomRecipe(customRecipe: NutritionalMealBody) {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [openCreateUpdateCustomRecipeDialog, setOpenCreateUpdateCustomRecipeDialog] = useState(false);
  const { deleteNutritionalMeal } = useCustomRecipe();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const deleteCustomRecipeHandler = () => {
    void deleteNutritionalMeal({
      professional: authContext.professional,
      nutritionalMeal: customRecipe._id || '',
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  return (
    <>
      <StyledTableRow key={customRecipe.name}>
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomRecipeDialog(true)} align="right">
          {customRecipe.name}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomRecipeDialog(true)} align="right">
          {customRecipe.macros.protein}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomRecipeDialog(true)} align="right">
          {customRecipe.macros.carbs}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomRecipeDialog(true)} align="right">
          {customRecipe.macros.fat}
        </StyledTableCell>
        <StyledTableCell onClick={() => setOpenCreateUpdateCustomRecipeDialog(true)} align="right">
          {customRecipe.macros.calories}
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
                  <div>Delete this Recipe?</div>
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
                      onClick={deleteCustomRecipeHandler}
                    >
                      Delete Recipe
                    </Button>
                  </div>
                </div>
              </MenuItem>
            </Menu>
          </Grid>
        </StyledTableCell>
      </StyledTableRow>

      {openCreateUpdateCustomRecipeDialog && (
        <CreateUpdateCustomRecipeDialog
          openCreateUpdateCustomRecipeDialog={openCreateUpdateCustomRecipeDialog}
          setOpenCreateUpdateCustomRecipeDialog={setOpenCreateUpdateCustomRecipeDialog}
          _customRecipe={customRecipe}
        />
      )}
    </>
  );
}

export default CustomRecipe;
