import { makeStyles } from 'tss-react/mui';

export const formStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '90%',
      margin: '0px auto',
      padding: '0px',
    },
    form: {
      width: '90%',
      margin: '0 auto',
    },
    accordion: {
      marginTop: '10px',
    },
    textField: {
      width: '100%',
      margin: '0px auto',
      marginTop: '15px',
    },
    button: {
      width: '100%',
      height: '45px',
      marginTop: '15px',
      marginBottom: '15px',
      /* '&:hover': {
        backgroundColor: 'blue',
      }, */
    },
  };
});

export const iconStyles = makeStyles()(() => {
  return {
    icon: {
      width: '100%',
      height: '100%',
    },
  };
});
