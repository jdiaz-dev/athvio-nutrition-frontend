import React, { useState, useRef, useEffect, useContext } from 'react';
import { Chip, Popover, Box, Typography, Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PatientBody } from 'src/modules/patients/patients/adapters/out/patient.types';
import { usePatient } from 'src/modules/patients/patients/adapters/out/PatientActions';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { openSnackbar } from 'src/shared/components/Snackbar/snackbar';
import { SnackbarProps } from 'src/shared/types/snackbar';

interface ResendPatientInvitationEmailProps {
  patient: PatientBody;
  inviteLink?: string;
}

function ResendPatientInvitationEmail({ patient, inviteLink }: ResendPatientInvitationEmailProps) {
  const { professional } = useContext(AuthContext);
  const { resendPatientInvitationEmail } = usePatient();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const open = Boolean(anchorEl);

  const handleChipClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // prevent row navigation
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleResend = async () => {
    try {
      await resendPatientInvitationEmail({ professional, patient: patient.uuid });
      handleClose();
      openSnackbar({
        open: true,
        message: 'Se ha enviado la invitación nuevamente.',
        variant: 'alert',
        alert: {
          color: 'success',
        },
      } as SnackbarProps);
    } catch (error) {
      handleClose();
      openSnackbar({
        open: true,
        message: 'Ha ocurrido un error al reenviar la invitación.',
        variant: 'alert',
        alert: {
          color: 'error',
        },
      } as SnackbarProps);
    }
  };

  /* const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }; */

  return (
    <>
      <Chip
        label="Invitación pendiente"
        onClick={handleChipClick}
        deleteIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onDelete={handleChipClick}
        sx={{
          'backgroundColor': 'warning.light',
          'color': 'white',
          'fontWeight': 500,
          'fontSize': '0.75rem',
          'cursor': 'pointer',
          '& .MuiChip-deleteIcon': {
            color: 'warning.dark',
            transition: 'transform 0.15s',
            transform: open ? 'rotate(180deg)' : 'none',
          },
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: { borderRadius: 2, p: 2, width: 260, mt: 0.5 },
          },
        }}
      >
        <Typography variant="body2" color="text.secondary" textAlign="center" mb={1.5}>
          {`${patient.user.firstname} ${patient.user.lastname} no ha aceptado tu invitación.`}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          startIcon={<MailOutlineIcon fontSize="small" />}
          onClick={handleResend}
          sx={{ mb: 1, textTransform: 'none' }}
        >
          Reenviar Invitación
        </Button>

        {/* <Button
          fullWidth
          variant="text"
          startIcon={<ContentCopyIcon fontSize="small" />}
          onClick={handleCopyLink}
          sx={{ textTransform: 'none', color: 'text.secondary' }}
        >
          {copied ? 'Copied!' : 'Copy invite link'}
        </Button> */}
      </Popover>
    </>
  );
}

export default ResendPatientInvitationEmail;
