import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { Chip, Grid, Menu, MenuItem } from '@mui/material';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';
import { useProgram } from 'src/modules/professionals/programs/adapters/out/ProgramActions';
import CreateUpdateProgramDialog from 'src/modules/professionals/programs/adapters/in/dialogs/CreateUpdateProgramDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { Navigate } from 'react-router-dom';
import AssignProgramDialog from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/AssignProgramDialog';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { useTranslation } from 'react-i18next';

const chipStyle = (totalPlans: number) => ({
  opacity: totalPlans > 0 ? 1 : 0.6,
  cursor: totalPlans > 0 ? 'pointer' : 'not-allowed',
});

function Program(program: ProgramBody) {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();
  const { t } = useTranslation();

  const [openCreateUpdateProgramDialog, setOpenCreateUpdateProgramDialog] = useState(false);
  const [openAssignPogramDialog, setOpenAssignPogramDialog] = useState(false);
  const [goToProgramPlans, setGoToProgramPlans] = useState(false);
  const { deleteProgram } = useProgram();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (alert && messageOk) {
      void deleteProgram({
        professional: authContext.professional,
        program: program.uuid || '',
      });
      reloadRecordListContext.setReloadRecordList(true);
      setAlert(false);
    }
  }, [alert, messageOk]);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const deleteProgramHandler = () => {
    setAnchorEl(null);
    setAlert(true);
    setMessage('Are you sure you want to delete this program?');
    setOpenDialog(true);
  };

  if (goToProgramPlans) {
    const path = `/professional/programs/${program.uuid}/plans`;
    return <Navigate replace to={path} />;
  }

  return (
    <>
      <StyledTableRow key={program.name} style={{ cursor: 'pointer' }}>
        <StyledTableCell width={'20%'} align="center" onClick={() => setGoToProgramPlans(true)}>
          {program.name}
        </StyledTableCell>
        <StyledTableCell align="center" onClick={() => setGoToProgramPlans(true)}>
          {program.description}
        </StyledTableCell>
        <StyledTableCell align="center">
          <Chip
            style={chipStyle(program.plans.length)}
            label={t('programsModule.buttons.assignProgram')}
            variant="outlined"
            onClick={() => {
              if (program.plans.length > 0) setOpenAssignPogramDialog(true);
            }}
          />
        </StyledTableCell>
        <StyledTableCell width={'5%'} align="center">
          <Grid item xs={8}>
            <IconButton aria-label="Example" onClick={handleAnchorOpen}>
              <FontAwesomeIcon icon={faEllipsisV} size="xs" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleAnchorClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => setOpenCreateUpdateProgramDialog(true)}>{t('programsModule.buttons.editProgram')}</MenuItem>
              <MenuItem onClick={deleteProgramHandler}>{t('programsModule.buttons.deleteProgram')}</MenuItem>
            </Menu>
          </Grid>
        </StyledTableCell>
      </StyledTableRow>

      {openCreateUpdateProgramDialog && (
        <CreateUpdateProgramDialog
          openCreateUpdateProgramDialog={openCreateUpdateProgramDialog}
          setOpenCreateUpdateProgramDialog={setOpenCreateUpdateProgramDialog}
          _program={program}
        />
      )}
      {openDialog && (
        <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} alert={alert} />
      )}
      {openAssignPogramDialog && (
        <AssignProgramDialog
          openAssignPogramDialog={openAssignPogramDialog}
          setOpenAssignPogramDialog={setOpenAssignPogramDialog}
          _program={program}
        />
      )}
    </>
  );
}

export default Program;
