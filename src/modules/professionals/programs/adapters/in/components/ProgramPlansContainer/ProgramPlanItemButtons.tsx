/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import PlanDetailDialog from 'src/shared/components/PlanDetailDialog/PlanDetailDialog';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { ProfessionalIdContext } from 'src/App';
import { PlanContext } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanContext';
import { mealPlanCreatedChange$ } from 'src/shared/components/PlanDetailDialog/MealDetail';
import AddIcon from '@mui/icons-material/Add';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { hoverIcon, programItemContainer, programItemWrapper } from 'src/shared/styles/styles';

const buttonStyles = makeStyles()(() => {
  return {
    container: programItemContainer,
    wrapper: {
      ...programItemWrapper,
      ...hoverIcon,
    },
    icon: {
      width: '100%',
      height: '30%',
    },
  };
});

function ProgramPlanItemButtons({ planDay, planWeek, program }: { planDay: number; planWeek: number; program: string }) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const planState = useSelector((state: ReduxStates) => state.programs.plan);

  const { createPlan, deletePlan } = usePlan();
  const [openPlanDetailDialog, setOpenPlanDetailDialog] = useState(false);
  const [planCrated, setPlanCrated] = useState(false);
  const [mealPlanCreated, setMealPlanCreated] = useState(false);

  useEffect(() => {
    const createProgramPlanHandler = async () => {
      const input = {
        professional: professionalIdContext.professional,
        program,
        week: planWeek,
        day: planDay,
      };
      await createPlan(input);
      setPlanCrated(true);
    };

    if (openPlanDetailDialog) {
      void createProgramPlanHandler();
    }
  }, [professionalIdContext.professional, openPlanDetailDialog]);

  useEffect(() => {
    const deletePlanHandler = async () => {
      const input = {
        professional: professionalIdContext.professional,
        program,
        plan: planState._id,
      };
      await deletePlan(input);
    };
    if (planCrated && !mealPlanCreated && !openPlanDetailDialog) {
      void deletePlanHandler();
    }
  }, [openPlanDetailDialog]);

  useEffect(() => {
    if (openPlanDetailDialog) {
      const subscription = mealPlanCreatedChange$.subscribe((val) => {
        setMealPlanCreated(val);
      });

      return () => {
        return subscription.unsubscribe();
      };
    }
  }, [openPlanDetailDialog]);

  const { classes } = buttonStyles();

  return (
    <div draggable className={classes.container}>
      <div className={classes.wrapper}>
        <AddIcon className={classes.icon} onClick={() => setOpenPlanDetailDialog(true)} />
      </div>
      <div className={classes.wrapper}>
        <ContentPasteIcon className={classes.icon} />
      </div>

      {openPlanDetailDialog && planState._id.length > 0 ? (
        <PlanContext.Provider value={{ isFromRecentlyCreatedPlan: true }}>
          <PlanDetailDialog
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
            domainOwnerId={program}
            planOwnerId={planState._id}
          />
        </PlanContext.Provider>
      ) : (
        openPlanDetailDialog && (
          <PlanDetailDialog
            openPlanDetailDialog={openPlanDetailDialog}
            setOpenPlanDetailDialog={setOpenPlanDetailDialog}
            domainOwnerId={program}
          />
        )
      )}
    </div>
  );
}

export default ProgramPlanItemButtons;
