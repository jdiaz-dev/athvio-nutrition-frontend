/* eslint-disable max-len */
import React, { useState } from 'react';
import { Card, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfessionalIdContext } from 'src/App';
import * as MealDetailsSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import * as MealBasicInfoSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { useMeal } from 'src/modules/professionals/programs/adapters/out/MealActions';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import { Modules } from 'src/shared/Consts';
import { ReduxStates } from 'src/shared/types/types';
import { makeStyles } from 'tss-react/mui';
import { PlanContext } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanContext';
import { mealPlanCreatedChange } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/CreatePlanButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { Meal } from 'src/modules/professionals/programs/adapters/out/program.types';

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      marginBottom: '30px',
      padding: '0px',
    },
  };
});

function MealDetail({ program, plan, meal: { position, mealTag, name, ...mealDetails } }: { program: string; plan: string; meal: Meal }) {
  const { classes } = cardStyles();
  const professionalIdContext = useContext(ProfessionalIdContext);
  const planContext = useContext(PlanContext);
  const mealBasicInfoState = useSelector((state: ReduxStates) => state.programs.mealBasicInfo);
  const mealDetailsState = useSelector((state: ReduxStates) => state.programs.mealDetails);

  const dispatch = useDispatch();
  const { createMeal, updateMeal, deleteMeal } = useMeal();
  const [componentTouched, setComponentTouched] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };
  const handleAnchorClose = () => {
    setAnchorEl(null);
  };
  const componentClickedHandler = () => {
    dispatch(MealBasicInfoSlice.acceptNewMealBasicInfo({ position, mealTag, name }));
    dispatch(MealDetailsSlice.acceptNewMealDetail(mealDetails));
    setComponentTouched(true);
  };
  const createUpdateMealPlanHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = mealDetailsState;
    if (mealDetailsState._id.length == 0) {
      await createMeal({
        professional: professionalIdContext.professional,
        program,
        plan,
        mealBody: {
          ...mealBasicInfoState,
          ...mealDetailsState,
        },
      });

      if (planContext.isFromRecentlyCreatedPlan) mealPlanCreatedChange.next(true);
    } else {
      await updateMeal({
        professional: professionalIdContext.professional,
        program,
        plan,
        meal: mealDetailsState._id,
        mealBody: {
          ...mealBasicInfoState,
          ...mealDetailsState,
        },
      });
    }
  };
  const deleteMealPlanHandler = async () => {
    setAnchorEl(null);
    setComponentTouched(false);
    await deleteMeal({
      professional: professionalIdContext.professional,
      program,
      plan,
      meal: mealDetailsState._id,
    });
  };

  const meal = () => (componentTouched ? mealDetailsState : mealDetails);
  return (
    <>
      <Card
        style={{ width: '55%' }}
        sx={{ minWidth: 275 }}
        className={classes.card}
        variant="outlined"
        onClick={() => {
          if (!componentTouched) {
            componentClickedHandler();
          }
        }}
        onMouseLeave={() => {
          if (componentTouched) void createUpdateMealPlanHandler();
          setComponentTouched(false);
        }}
      >
        <Grid item xs={8}>
          <IconButton aria-label="Example" onClick={handleAnchorOpen}>
            <FontAwesomeIcon icon={faEllipsisV} size="xs" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleAnchorClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => deleteMealPlanHandler()}>Delete meal</MenuItem>
          </Menu>
        </Grid>

        {/* this context maybe will be used */}
        <div>{mealBasicInfoState.mealTag}</div>
        <CurrentModuleContext.Provider value={{ currentModule: Modules.PROGRAMS }}>
          <MealBuilder meal={meal()} />
        </CurrentModuleContext.Provider>
      </Card>
    </>
  );
}

export default MealDetail;
