import { Box } from '@mui/system';
import React, { useState } from 'react';
import QuestionaryDetailsDialog from 'src/modules/professionals/questionary-config/adapters/in/dialogs/QuestionaryDetailsDialog';
import { QuestionaryGroup } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';

function QuestionaryGroupItem({ questionaryGroup }: { questionaryGroup: QuestionaryGroup }) {
  const [openQuestionaryGroupDialog, setOpenQuestionaryGroupDialog] = useState(false);

  const openDialogManager = () => {
    setOpenQuestionaryGroupDialog(true);
  };

  return (
    <>
      <Box
        onClick={openDialogManager}
        style={{ width: '100%', /* height: '50px', */ display: 'flex', border: '2px solid blue', margin: '2px' }}
      >
        <div style={{ width: '23%' }}>{questionaryGroup.title} </div>
        <div style={{ width: '77%', display: 'flex', flexWrap: 'wrap' }}>
          {questionaryGroup.questionaryDetails.map((questionaryDetail, index) => (
            /* todo: remove double border */
            <div key={index} style={{ width: '20%', border: '2px solid red' }}>
              {/* todo: remove divider */}
              {/* <Divider orientation="vertical" style={{ background: 'white' }} flexItem /> */}
              <div>{questionaryDetail.fieldName} </div>
            </div>
          ))}
        </div>
      </Box>

      {openQuestionaryGroupDialog && (
        <QuestionaryDetailsDialog
          openQuestionaryGroupDialog={openQuestionaryGroupDialog}
          setOpenQuestionaryGroupDialog={setOpenQuestionaryGroupDialog}
          questionaryGroup={questionaryGroup}
        />
      )}
    </>
  );
}

export default QuestionaryGroupItem;
