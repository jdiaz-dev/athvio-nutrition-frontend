import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { Grid, Menu, MenuItem } from '@mui/material';
import { ProfessionalIdContext } from 'src/App';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';
import { useProgram } from 'src/modules/professionals/programs/adapters/out/ProgramActions';
import CreateUpdateProgramDialog from 'src/modules/professionals/programs/adapters/in/dialogs/CreateUpdateProgramDialog';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import MessageDialog from 'src/shared/dialogs/MessageDialog';

function Program(program: ProgramBody) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert } = useMessageDialog();

  const [openCreateUpdateProgramDialog, setOpenCreateUpdateProgramDialog] = useState(false);
  const { deleteProgram } = useProgram();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (alert && messageOk) {
      void deleteProgram({
        professional: professionalIdContext.professional,
        program: program._id || '',
      });
      reloadRecordListContext.setReloadRecordList(true);
      setAlert(false);
    }
  }, [alert, messageOk]);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
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

  return (
    <>
      <StyledTableRow key={program.name}>
        <StyledTableCell align="right">{program.name}</StyledTableCell>
        <StyledTableCell align="right">{program.description}</StyledTableCell>
        <StyledTableCell align="right">
          <Grid item xs={8}>
            <IconButton aria-label="Example" onClick={handleAnchorOpen}>
              <FontAwesomeIcon icon={faEllipsisV} />
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
              <MenuItem onClick={() => setOpenCreateUpdateProgramDialog(true)}>Edit program</MenuItem>
              <MenuItem onClick={deleteProgramHandler}>Delete program</MenuItem>
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
        <MessageDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          message={message}
          setMessageOk={setMessageOk}
          alert={alert}
        />
      )}
    </>
  );
}

export default Program;
