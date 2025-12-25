import React, { useContext, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { GraphqlErrorEvents, unauthorizedEvent } from 'src/graphql/ApolloClient';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';

function UnauthorizedDialog() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    const handleUnauthorized = () => {
      setOpen(true);
    };

    unauthorizedEvent.addEventListener(GraphqlErrorEvents.UNAUTHORIZED, handleUnauthorized);

    return () => {
      unauthorizedEvent.removeEventListener(GraphqlErrorEvents.UNAUTHORIZED, handleUnauthorized);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    signOut();
    setOpen(false);
    navigate(`/signin`);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sesión Expirada</DialogTitle>
      <DialogContent>
        <DialogContentText>Su sesión ha expirado o no está autorizado. Por favor, inicie sesión nuevamente.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} variant="contained" color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UnauthorizedDialog;
