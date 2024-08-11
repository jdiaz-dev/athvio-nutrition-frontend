import React, { useState } from 'react';
import { Button, Card, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { QuestionaryGroup } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import CheckIcon from '@mui/icons-material/Check';
import CloseDialogIcon from 'src/shared/components/CloseDialogIcon';
import ActiveQuestionaryDetail from 'src/modules/professionals/questionary-config/adapters/in/dialogs/ActiveQuestionaryDetail';

const style = {
  // p: 0,
  width: '85%',
  margin: 'auto',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

function QuestionaryDetailsDialog({
  openQuestionaryGroupDialog,
  setOpenQuestionaryGroupDialog,
  questionaryGroup,
}: {
  openQuestionaryGroupDialog: boolean;
  setOpenQuestionaryGroupDialog: (openProgram: boolean) => void;
  questionaryGroup: QuestionaryGroup;
}) {
  const closeIconDialogHandler = () => {
    setOpenQuestionaryGroupDialog(false);
    setClosedIconDialog(false);
  };
  const [closedIconDialog, setClosedIconDialog] = useState(true);

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
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {questionaryGroup.questionaryDetails.map((questionaryDetail, index) => (
              <ActiveQuestionaryDetail key={index} questionaryDetail={questionaryDetail} />
            ))}
          </List>

          <Card variant="outlined">
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QuestionaryDetailsDialog;
