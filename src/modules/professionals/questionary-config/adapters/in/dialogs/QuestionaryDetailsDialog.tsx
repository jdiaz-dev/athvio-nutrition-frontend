import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { QuestionaryGroup } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import * as QuestionaryConfigSlice from 'src/modules/professionals/questionary-config/adapters/in/slicers/QuestionaryConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import OtherQuestionaryDetailsManager from 'src/modules/professionals/questionary-config/adapters/in/dialogs/OtherQuestionaryDetailsManager';
import DefaultQuestionaryDetailsManager from 'src/modules/professionals/questionary-config/adapters/in/dialogs/DefaultQuestionaryDetailsManager';

function QuestionaryDetailsDialog({
  openQuestionaryGroupDialog,
  setOpenQuestionaryGroupDialog,
  questionary,
  questionaryGroup,
}: {
  openQuestionaryGroupDialog: boolean;
  setOpenQuestionaryGroupDialog: (openProgram: boolean) => void;
  questionary: string;
  questionaryGroup: QuestionaryGroup;
}) {
  const dispatch = useDispatch();
  const questionaryDetails = useSelector((state: ReduxStates) => state.questionaryConfig.questionaryDetails);
  const closeIconDialogHandler = () => {
    setOpenQuestionaryGroupDialog(false);
    setClosedIconDialog(false);
  };
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  useEffect(() => {
    dispatch(QuestionaryConfigSlice.initializeQuestionaryDetails(questionaryGroup.questionaryDetails));
  }, [questionaryGroup]);

  return (
    <>
      <Dialog
        open={openQuestionaryGroupDialog}
        onClose={() => {
          setOpenQuestionaryGroupDialog(false);
        }}
        scroll="paper"
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {questionaryGroup.title}
          <CloseDialogIcon closedIconDialog={closedIconDialog} closeIconDialogHandler={closeIconDialogHandler} />
        </DialogTitle>
        <DialogContent dividers={true} style={{ minHeight: '900px' }}>
          {questionaryGroup.title === 'Otros' ? (
            <OtherQuestionaryDetailsManager
              questionary={questionary}
              questionaryGroup={questionaryGroup}
              questionaryDetails={questionaryDetails}
            />
          ) : (
            <DefaultQuestionaryDetailsManager
              questionary={questionary}
              questionaryGroup={questionaryGroup}
              questionaryDetails={questionaryDetails}
              setOpenQuestionaryGroupDialog={setOpenQuestionaryGroupDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QuestionaryDetailsDialog;
