import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { MessagesUserForm } from 'src/shared/Consts';
import { CREATE_CLIENT } from 'src/modules/clients/clients/adapters/out/ClientQueries';
import { makeStyles } from 'tss-react/mui';
import {
  BodyClient,
  ClientData,
  CreateClientRequest,
  CreateClientResponse,
  UserInfoForClient,
} from 'src/modules/clients/clients/adapters/out/client.types';
import CountryCodeSelect from 'src/shared/components/CountryCodeSelect';
import { Dayjs } from 'dayjs';
import { ApolloError, useMutation } from '@apollo/client';
import { ClientCreatedSucessfullyDialog } from 'src/modules/clients/clients/adapters/in/dialogs/ClientCreatedSucessfullyDialog';
import { ProfessionalIdContext, SearcherBarContext } from 'src/App';
import SearcherBar from 'src/shared/components/SearcherBar';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types';
import IngredientList from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/IngredientList';
import NutrientsDetail from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/NutrientsDetail';
import Recipe from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/Recipe';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      padding: '0px',
    },
    form: {
      width: '100%',
    },
    textField: {
      width: '90%',
      marginTop: '15px',
    },
    button: {
      'backgroundColor': 'blue',
      'width': '90%',
      'color': 'white',
      'height': '45px',
      'marginTop': '15px',
      'marginBottom': '15px',
      '&:hover': {
        backgroundColor: 'blue',
      },
    },
  };
});

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    'border': `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  'backgroundColor': theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  'flexDirection': 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function CreateCustomMealDialog({
  openCreateCustomMealDialog,
  setOpenCreateCustomMealDialog,
  setReloadCustomMealList,
}: {
  openCreateCustomMealDialog: boolean;
  setOpenCreateCustomMealDialog: (openDialog: boolean) => void;
  setReloadCustomMealList: (openDialog: boolean) => void;
}) {
  const { classes } = cardStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const professionalIdContext = useContext(ProfessionalIdContext);

  const [createClientHandler] = useMutation<CreateClientResponse, CreateClientRequest>(CREATE_CLIENT);
  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const [foods, setFoods] = useState<{ amount: number; ingredientName: string }[]>();
  //   const [openMessageClientDialog, setOpenMessageClientDialog] = useState(false);

  const handleChangeAditionalInfo = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };

  /* const onSubmit = async ({ firstName, lastName, email, ...rest }: ClientData): Promise<void> => {
    // eslint-disable-next-line prefer-const
    let input: BodyClient = {
      professionalId: professionalIdContext.professionalId,
      userInfo: {
        firstName,
        lastName,
        email,
      },
      additionalInfo: {
        ...rest,
      },
    };

    if (countryCode) input.additionalInfo.countryCode = countryCode;
    if (birthday !== null && birthday !== '') input.additionalInfo.birthday = birthday;
    if (gender !== '') input.additionalInfo.gender = gender;

    try {
      const client = await createClientHandler({
        variables: {
          input,
        },
      });
      const _client = client.data?.createClient.userInfo as UserInfoForClient;
      setUserInfo({
        email: _client.email,
        firstName: _client.firstName,
        lastName: _client.lastName,
      });
      setOpenMessageClientDialog(true);
      setOpenCreateCustomMealDialog(false);
      const clientReset = {
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        timezone: '',
        height: null,
        weight: null,
        profilePicture: '',
        phone: '',
      };
      reset(clientReset);
      setReloadCustomMealList(true);
    } catch (err) {
      console.log('-------------error graphQLErrors', (err as ApolloError).graphQLErrors);
    }
  }; */

  return (
    <>
      <Dialog
        open={openCreateCustomMealDialog}
        onClose={() => setOpenCreateCustomMealDialog(false)}
        scroll="paper"
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent dividers={true}>
          <Card className={classes.card} variant="outlined">
            <IngredientList />
            <NutrientsDetail />
            <Recipe />
          </Card>
        </DialogContent>
      </Dialog>
      {/* <ClientCreatedSucessfullyDialog
        openMessageClientDialog={openMessageClientDialog}
        setOpenMessageClientDialog={setOpenMessageClientDialog}
        firstName={userInfo.firstName}
        lastName={userInfo.lastName}
      /> */}
    </>
  );
}

export default CreateCustomMealDialog;
