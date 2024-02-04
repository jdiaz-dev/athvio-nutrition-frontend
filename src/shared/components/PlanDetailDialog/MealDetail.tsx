/* eslint-disable max-len */
import React, { useState } from 'react';
import { Card, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { Subject } from 'rxjs';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as MealDetailsSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import * as MealBasicInfoSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import { Modules } from 'src/shared/Consts';
import { ReduxStates } from 'src/shared/types/types';
import { makeStyles } from 'tss-react/mui';
import { PlanContext } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import MealTag from 'src/modules/professionals/programs/adapters/in/dialogs/PlanDetailDialog/MealTag';
import { useMealDetailAdapter } from 'src/shared/hooks/useMealDetailAdapter';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

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
const mealPlanCreatedChange = new Subject<boolean>();
export const mealPlanCreatedChange$ = mealPlanCreatedChange.asObservable();

function MealDetail({
  domainOwnerId,
  planOwnerId,
  meal: { position, mealTag, name, ...mealDetails },
}: {
  domainOwnerId: string;
  planOwnerId: string;
  meal: Meal;
}) {
  const { classes } = cardStyles();
  const authContext = useContext(AuthContext);
  const currentModuleContext = useContext(CurrentModuleContext);
  const planContext = useContext(PlanContext);
  const mealBasicInfoState =
    currentModuleContext.currentModule === Modules.PROGRAMS
      ? useSelector((state: ReduxStates) => state.programs.mealBasicInfo)
      : useSelector((state: ReduxStates) => state.patientPlans.mealBasicInfo);
  const mealDetailsState =
    currentModuleContext.currentModule === Modules.PROGRAMS
      ? useSelector((state: ReduxStates) => state.programs.mealDetails)
      : useSelector((state: ReduxStates) => state.patientPlans.mealDetails);

  const dispatch = useDispatch();

  const { createMeal, updateMeal, deleteMeal } = useMealDetailAdapter(currentModuleContext.currentModule);
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
  const createUpdateMealHandler = async () => {
    const { _id, ...restMealDetail } = mealDetailsState;
    if (mealDetailsState._id.length == 0) {
      await createMeal({
        professional: authContext.professional,
        domainOwnerId,
        planOwnerId,
        mealBody: {
          ...mealBasicInfoState,
          ...restMealDetail,
        },
      });

      if (planContext.isFromRecentlyCreatedPlan) mealPlanCreatedChange.next(true);
    } else {
      await updateMeal({
        professional: authContext.professional,
        domainOwnerId,
        planOwnerId,
        meal: _id,
        mealBody: {
          ...mealBasicInfoState,
          ...restMealDetail,
        },
      });
    }
  };
  const deleteMealHandler = async () => {
    setAnchorEl(null);
    setComponentTouched(false);
    await deleteMeal({
      professional: authContext.professional,
      domainOwnerId,
      planOwnerId,
      meal: mealDetailsState._id,
    });
  };

  const meal = () => (componentTouched ? mealDetailsState : mealDetails);
  return (
    <>
      <Card
        style={{ width: '55%', padding: '10px' }}
        sx={{ minWidth: 275 }}
        className={classes.card}
        variant="outlined"
        onClick={() => {
          if (!componentTouched) {
            componentClickedHandler();
          }
        }}
        onMouseLeave={() => {
          if (componentTouched) void createUpdateMealHandler();
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
            <MenuItem onClick={() => deleteMealHandler()}>Delete meal</MenuItem>
          </Menu>
        </Grid>

        <MealTag mealTag={mealTag} componentTouched={componentTouched} />
        <CurrentModuleContext.Provider value={{ currentModule: Modules.PROGRAMS }}>
          <MealBuilder meal={meal()} />
        </CurrentModuleContext.Provider>
      </Card>
    </>
  );
}

export default MealDetail;
