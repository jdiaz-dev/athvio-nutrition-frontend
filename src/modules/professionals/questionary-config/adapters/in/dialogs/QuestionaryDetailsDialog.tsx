import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogContent, DialogTitle, List } from '@mui/material';
import { QuestionaryGroup } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import EnableQuestionaryDetailManager from 'src/modules/professionals/questionary-config/adapters/in/dialogs/EnableQuestionaryDetailManager';
import * as QuestionaryConfigSlice from 'src/modules/professionals/questionary-config/adapters/in/slicers/QuestionaryConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { useQuestionaryConfig } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfigActions';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import OtherQuestionaryDetailManager from 'src/modules/professionals/questionary-config/adapters/in/dialogs/OtherQuestionaryDetail.Manager';
import MainCard from 'src/shared/components/MainCard/MainCard';

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
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const questionaryDetails = useSelector((state: ReduxStates) => state.questionaryConfig.questionaryDetails);
  const isEnabledQuestionaryDetails = useSelector((state: ReduxStates) => state.questionaryConfig.isEnabledQuestionaryDetails);
  const { enableQuestionaryDetails } = useQuestionaryConfig();

  const closeIconDialogHandler = () => {
    setOpenQuestionaryGroupDialog(false);
    setClosedIconDialog(false);
  };
  const [closedIconDialog, setClosedIconDialog] = useState(true);

  useEffect(() => {
    dispatch(QuestionaryConfigSlice.initializeQuestionaryDetails(questionaryGroup.questionaryDetails));
  }, [questionaryGroup]);
  const enabledQuestionaryDetailsHandler = async () => {
    await enableQuestionaryDetails({
      professional: authContext.professional,
      questionary,
      questionaryGroup: questionaryGroup._id,
      questionaryDetails: isEnabledQuestionaryDetails,
    });
    setOpenQuestionaryGroupDialog(false);
  };

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
            <MainCard>
              {questionaryDetails.map((questionaryDetail, index) => (
                <OtherQuestionaryDetailManager key={index} questionaryDetail={questionaryDetail} />
              ))}
            </MainCard>
          ) : (
            <List sx={{ width: '100%', display:'flex',  bgcolor: 'background.paper' }}>
              {questionaryDetails.map((questionaryDetail, index) => (
                <EnableQuestionaryDetailManager key={index} questionaryDetail={questionaryDetail} />
              ))}
            </List>
          )}

          <Card variant="outlined">
            <Button variant="contained" onClick={enabledQuestionaryDetailsHandler}>
              Save
            </Button>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QuestionaryDetailsDialog;
