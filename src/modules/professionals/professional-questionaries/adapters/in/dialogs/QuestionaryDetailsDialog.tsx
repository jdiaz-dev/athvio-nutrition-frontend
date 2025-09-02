import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { QuestionaryGroup } from 'src/modules/professionals/professional-questionaries/adapters/out/ProfessionalQuestionary';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import * as ProfessionalQuestionarySlice from 'src/modules/professionals/professional-questionaries/adapters/in/slicers/ProfessionalQuestionarySlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import CustomQuestionaryDetailsManager from 'src/modules/professionals/professional-questionaries/adapters/in/dialogs/CustomQuestionaryDetailsManager';
import DefaultQuestionaryDetailsManager from 'src/modules/professionals/professional-questionaries/adapters/in/dialogs/DefaultQuestionaryDetailsManager';
import { CustomFieldsGroupNamesEnum } from 'src/shared/Consts';

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
  const questionaryDetails = useSelector((state: ReduxStates) => state.professionalQuestionary.questionaryDetails);
  const closeIconDialogHandler = () => {
    setOpenQuestionaryGroupDialog(false);
    setClosedIconDialog(false);
  };
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  useEffect(() => {
    dispatch(ProfessionalQuestionarySlice.initializeQuestionaryDetails(questionaryGroup.questionaryDetails));
  }, [questionaryGroup]);

  return (
    <>
      <Dialog
        open={openQuestionaryGroupDialog}
        onClose={() => {
          setOpenQuestionaryGroupDialog(false);
        }}
        scroll="body"
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
          {questionaryGroup.title === CustomFieldsGroupNamesEnum.PERSONALIZADO ||
          questionaryGroup.title === CustomFieldsGroupNamesEnum.CUSTOMIZED ? (
            <CustomQuestionaryDetailsManager
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
