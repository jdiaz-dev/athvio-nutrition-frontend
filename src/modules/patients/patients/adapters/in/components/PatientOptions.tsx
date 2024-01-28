import React, { useState, useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArchiveIcon from '@mui/icons-material/Archive';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { ARCHIVE_CLIENT } from 'src/modules/patients/patients/adapters/out/PatientQueries';
import { useMutation } from '@apollo/client';
import { ManagePatientStateRequest, ManagePatientStateResponse } from 'src/modules/patients/patients/adapters/out/patient.types';
import { PatientStates, PatientStatesActions } from 'src/shared/Consts';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ProfessionalIdContext } from 'src/App';
import { PatientStateContext } from 'src/modules/patients/patients/adapters/in/components/PatientStateContext';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    'borderRadius': 6,
    'marginTop': theme.spacing(1),
    'minWidth': 180,
    'color': theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    'boxShadow':
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function PatientOptions({ patient }: { patient: string }) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const patientStateContext = useContext(PatientStateContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [manageStateMutation] = useMutation<ManagePatientStateResponse, ManagePatientStateRequest>(ARCHIVE_CLIENT);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const optionSelectedHandler = async () => {
    setAnchorEl(null);
    await manageStateMutation({
      variables: {
        input: {
          professional: professionalIdContext.professional,
          patient,
          state: patientStateContext.indexState === 1 ? PatientStates.ACTIVE : PatientStates.ARCHIVED,
        },
      },
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {patientStateContext.indexState === 1 ? (
          <MenuItem onClick={optionSelectedHandler} disableRipple>
            <PowerSettingsNewIcon />
            {PatientStatesActions.ACTIVATE}
          </MenuItem>
        ) : (
          <>
            <MenuItem onClick={optionSelectedHandler} disableRipple>
              <ArchiveIcon />
              {PatientStatesActions.ARCHIVE}
            </MenuItem>
            <MenuItem disableRipple>
              <ChatBubbleIcon />
              Message
            </MenuItem>
          </>
        )}
      </StyledMenu>
    </>
  );
}
