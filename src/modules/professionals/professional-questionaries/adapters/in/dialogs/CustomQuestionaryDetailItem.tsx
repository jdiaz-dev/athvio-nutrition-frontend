import { ChangeEvent } from 'react';
import { Box, Checkbox, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { QuestionaryDetail } from 'src/modules/professionals/professional-questionaries/adapters/out/ProfessionalQuestionary';
import * as CustomProfessionalQuestionaryDetailsSlice from 'src/modules/professionals/professional-questionaries/adapters/in/slicers/CustomQuestionaryDetailsSlice';
import { useDispatch } from 'react-redux';

const cardStyles = makeStyles()(() => {
  return {
    textField: {
      width: '90%',
      marginTop: '15px',
    },
  };
});

function CustomQuestionaryDetailItem({ questionaryDetail: questionaryDetailData }: { questionaryDetail: QuestionaryDetail }) {
  const dispatch = useDispatch();
  const { classes } = cardStyles();
  const { uuid, ...rest } = questionaryDetailData;

  const fieldNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(CustomProfessionalQuestionaryDetailsSlice.updateCustom({ ...rest, uuid: uuid as string, fieldName: e.target.value }));
  };
  const associatedQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(CustomProfessionalQuestionaryDetailsSlice.updateCustom({ ...rest, uuid: uuid as string, associatedQuestion: e.target.value }));
  };

  const enableQuestionaryDetailHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(CustomProfessionalQuestionaryDetailsSlice.updateCustom({ ...rest, uuid: uuid as string, isEnabled: !questionaryDetailData.isEnabled }));
  };
  const deleteCustomQuestionaryDetailHandler = () => {
    dispatch(CustomProfessionalQuestionaryDetailsSlice.deleteCustom(uuid as string));
  };
  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{ display: 'flex' }}>
        <Typography variant="h6">{questionaryDetailData.associatedQuestion}</Typography>
        <CheckIcon style={{ color: questionaryDetailData.isEnabled ? 'green' : '' }} />
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            variant="outlined"
            label="Pregunta asociada"
            type="text"
            value={questionaryDetailData.associatedQuestion}
            onChange={associatedQuestionHandler}
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            variant="outlined"
            label="Nombre del campo"
            type="text"
            value={questionaryDetailData.fieldName}
            onChange={fieldNameHandler}
            /* {...register('location', { required: false })}
              error={Boolean(errors.location)}
              helperText={errors.location?.message as ReactNode} */
          />

          <Box component="section" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              Enabled:{' '}
              <Checkbox
                className="size-large"
                onChange={enableQuestionaryDetailHandler}
                checked={questionaryDetailData.isEnabled ? true : false}
                color="success"
              />
            </div>
            <DeleteForeverIcon onClick={deleteCustomQuestionaryDetailHandler} />
          </Box>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export default CustomQuestionaryDetailItem;
