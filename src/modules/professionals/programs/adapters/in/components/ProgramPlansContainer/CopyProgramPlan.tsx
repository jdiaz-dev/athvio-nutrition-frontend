import React from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { makeStyles } from 'tss-react/mui';
import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import { useDispatch } from 'react-redux';

const buttonStyles = makeStyles()(() => {
  return {
    icon: {
      width: '45%',
      marginRight: '3px',
    },
  };
});

function CopyProgramPlan({ plan }: { plan: string }) {
  const { classes } = buttonStyles();
  const dispatch = useDispatch();

  const copyPlanHandler = () => {
    dispatch(PlanSlice.duplicatingProgramPlan({ _id: plan }));
  };
  return (
    <>
      <ContentPasteIcon className={classes.icon} onClick={copyPlanHandler} />
    </>
  );
}

export default CopyProgramPlan;
