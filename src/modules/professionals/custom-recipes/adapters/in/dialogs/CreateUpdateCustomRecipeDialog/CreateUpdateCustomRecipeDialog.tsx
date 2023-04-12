import React, { useContext, useEffect, useState } from 'react';
import { Card, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import CloseIcon from '@mui/icons-material/Close';

import NutrientsDetail from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/NutrientsDetail';
import * as CustomRecipeSlicers from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomRecipe } from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';
import { Modules } from 'src/shared/Consts';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import { RecipeBody } from 'src/shared/components/MealBuilder/MealBuilder.types';

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      padding: '0px',
    },
    form: {
      width: '100%',
    },
    textField: {
      width: '90%',
      marginTop: '15px',
    },
    button: {
      'backgroundColor': 'blue',
      'width': '90%',
      'color': 'white',
      'height': '45px',
      'marginTop': '15px',
      'marginBottom': '15px',
      '&:hover': {
        backgroundColor: 'blue',
      },
    },
  };
});

function CreateUpdateCustomRecipeDialog({
  openCreateUpdateCustomRecipeDialog,
  setOpenCreateUpdateCustomRecipeDialog,
  _customRecipe,
}: {
  openCreateUpdateCustomRecipeDialog: boolean;
  setOpenCreateUpdateCustomRecipeDialog: (openDialog: boolean) => void;
  _customRecipe?: RecipeBody;
}) {
  const { classes } = cardStyles();
  const dispatch = useDispatch();
  const customRecipeState = useSelector((state: ReduxStates) => state.customRecipes.customRecipe);

  const { createCustomRecipe, updateCustomRecipe } = useCustomRecipe();

  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const [componentMouseOut, setComponentMouseOut] = useState(false);
  const [closeIconDialog, setCloseIconDialog] = useState(true);

  useEffect(() => {
    if (_customRecipe !== undefined) {
      dispatch(CustomRecipeSlicers.acceptNewMealDetail(_customRecipe));
    } else {
      dispatch(CustomRecipeSlicers.reinitializeMeal());
    }
    return () => {
      dispatch(CustomRecipeSlicers.reinitializeMeal());
    };
  }, [_customRecipe]);

  const { _id, professional, ...restCustomRecipe } = customRecipeState;
  useEffect(() => {
    const createUpdateCustomRecipeHelper = async () => {
      if (_customRecipe && _customRecipe._id) {
        await updateCustomRecipe({
          customRecipe: _id,
          professional,
          ...restCustomRecipe,
        });
        setComponentMouseOut(false);
      } else {
        await createCustomRecipe({ professional, ...restCustomRecipe });
        setComponentMouseOut(false);
      }
    };
    if (componentMouseOut) {
      void createUpdateCustomRecipeHelper();
    }
  }, [componentMouseOut, _customRecipe]);

  useEffect(() => {
    if (!closeIconDialog) {
      reloadRecordListContext.setReloadRecordList(true);
      setOpenCreateUpdateCustomRecipeDialog(false);
    }
  }, [closeIconDialog]);

  return (
    <>
      <Dialog
        open={openCreateUpdateCustomRecipeDialog}
        onClose={() => {
          setOpenCreateUpdateCustomRecipeDialog(false);
          dispatch(CustomRecipeSlicers.reinitializeMeal());
        }}
        scroll="paper"
        fullWidth={true}
        maxWidth="xl"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Create your custom recipe
          {closeIconDialog ? (
            <IconButton
              aria-label="close"
              onClick={() => {
                setCloseIconDialog(false);
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent
          dividers={true}
          style={{ minHeight: '900px', display: 'flex', justifyContent: 'space-between', border: '2px solid brown' }}
        >
          <Card
            style={{ width: '55%' }}
            sx={{ minWidth: 275 }}
            className={classes.card}
            variant="outlined"
            onMouseLeave={() => {
              setComponentMouseOut(true);
            }}
          >
            <CurrentModuleContext.Provider value={{ currentModule: Modules.CUSTOM_RECIPES }}>
              <MealBuilder meal={{ _id, ...restCustomRecipe }} />
            </CurrentModuleContext.Provider>
          </Card>
          <NutrientsDetail />
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CreateUpdateCustomRecipeDialog;
