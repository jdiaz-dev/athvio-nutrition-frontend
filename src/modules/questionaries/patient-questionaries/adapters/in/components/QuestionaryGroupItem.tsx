import { Box } from '@mui/system';
import React, { useState } from 'react';
import QuestionaryDetailsDialog from 'src/modules/questionaries/professional-questionaries/adapters/in/dialogs/QuestionaryDetailsDialog';
import { QuestionaryGroup } from 'src/modules/questionaries/professional-questionaries/adapters/out/ProfessionalQuestionary';

function QuestionaryGroupItem({ questionary, questionaryGroup }: { questionary: string; questionaryGroup: QuestionaryGroup }) {
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
        <div style={{ width: '77%', display: 'flex', justifyContent:'flex-start', flexWrap: 'wrap' }}>
          {questionaryGroup.questionaryDetails.map(
            (item, index) =>
              item.isEnabled && (
                /* todo: remove double border */
                <div key={index} style={{ width:'25%', border: '2px solid red' }}>
                  {/* todo: remove divider */}
                  {/* <Divider orientation="vertical" style={{ background: 'white' }} flexItem /> */}
                  <div>{item.fieldName} </div>
                </div>
              ),
          )}
        </div>
      </Box>

      {openQuestionaryGroupDialog && (
        <QuestionaryDetailsDialog
          openQuestionaryGroupDialog={openQuestionaryGroupDialog}
          setOpenQuestionaryGroupDialog={setOpenQuestionaryGroupDialog}
          questionary={questionary}
          questionaryGroup={questionaryGroup}
        />
      )}
    </>
  );
}

export default QuestionaryGroupItem;
