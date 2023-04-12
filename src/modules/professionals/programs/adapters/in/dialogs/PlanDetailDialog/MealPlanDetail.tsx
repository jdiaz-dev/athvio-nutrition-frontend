/* eslint-disable max-len */
import React, { useState } from 'react';
import { Card, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfessionalIdContext } from 'src/App';
import * as MealPlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealPlanSlice';
import { useMealPlan } from 'src/modules/professionals/programs/adapters/out/MealPlanActions';
import { MealPlan } from 'src/modules/professionals/programs/adapters/out/program.types';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import { Modules } from 'src/shared/Consts';
import { ReduxStates } from 'src/shared/types/types';
import { makeStyles } from 'tss-react/mui';
import { PlanContext } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanContext';
import { mealPlanCreatedChange } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/CreatePlanButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';

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

function MealPlanDetail({ program, plan, mealPlan: { position, ...restMealPlan } }: { program: string; plan: string; mealPlan: MealPlan }) {
  const { classes } = cardStyles();
  const professionalIdContext = useContext(ProfessionalIdContext);
  const planContext = useContext(PlanContext);
  const mealPlanState = useSelector((state: ReduxStates) => state.programs.mealPlan);

  const dispatch = useDispatch();
  const { createMealPlan, updateMealPlan, deleteMealPlan } = useMealPlan();
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
    dispatch(MealPlanSlice.acceptNewMealDetail(restMealPlan));
    setComponentTouched(true);
  };
  const createUpdateMealPlanHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = mealPlanState;
    if (mealPlanState._id.length == 0) {
      await createMealPlan({
        professional: professionalIdContext.professional,
        program,
        plan,
        mealPlanBody: { position, ...rest },
      });

      if (planContext.isFromRecentlyCreatedPlan) mealPlanCreatedChange.next(true);
    } else {
      await updateMealPlan({
        professional: professionalIdContext.professional,
        program,
        plan,
        mealPlan: mealPlanState._id,
        mealPlanBody: { position, ...rest },
      });
    }
  };
  const deleteMealPlanHandler = async () => {
    setAnchorEl(null);
    setComponentTouched(false);
    await deleteMealPlan({
      professional: professionalIdContext.professional,
      program,
      plan,
      mealPlan: mealPlanState._id,
    });
  };

  const mealPlan = () => (componentTouched ? mealPlanState : restMealPlan);
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
        <CurrentModuleContext.Provider value={{ currentModule: Modules.PROGRAMS }}>
          <div>
            <MealBuilder meal={mealPlan()} />
          </div>
        </CurrentModuleContext.Provider>
      </Card>
    </>
  );
}

export default MealPlanDetail;
