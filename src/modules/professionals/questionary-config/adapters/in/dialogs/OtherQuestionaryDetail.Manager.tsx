import { Box, Checkbox, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { QuestionaryDetail } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';

const cardStyles = makeStyles()(() => {
  return {
    textField: {
      width: '90%',
      marginTop: '15px',
    },
  };
});

function OtherQuestionaryDetailManager({ questionaryDetail }: { questionaryDetail: QuestionaryDetail }) {
  const { classes } = cardStyles();

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography variant="h6">{questionaryDetail.associatedQuestion}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            variant="outlined"
            label="Nombre del campo"
            type="text"
            value={questionaryDetail.fieldName}
            /* {...register('location', { required: false })}
              error={Boolean(errors.location)}
              helperText={errors.location?.message as ReactNode} */
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            variant="outlined"
            label="Pregunta asociada"
            type="text"
            value={questionaryDetail.associatedQuestion}
            /* {...register('location', { required: false })}
              error={Boolean(errors.location)}
              helperText={errors.location?.message as ReactNode} */
          />

          <Box component="section" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              Enabled: <Checkbox className="size-large" checked={questionaryDetail.isEnabled ? true : false} color="success" />
            </div>
            <DeleteForeverIcon />
          </Box>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export default OtherQuestionaryDetailManager;
