import { Button, Menu, MenuItem } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import CreatePatientGroupDialog from 'src/modules/professionals/patient-groups/adapters/in/dialogs/CreatePatientGroupDialog';
import PatientGroupListDialog from 'src/modules/professionals/patient-groups/adapters/in/dialogs/PatientGroupListDialog/PatientGroupListDialog';

function PatientGroupsContainer() {
  const [openCreatePatientGroupDialog, setOpenCreatePatientGroupDialog] = useState(false);
  const [openPatientGroupListDialog, setOpenPatientGroupListDialog] = useState(false);
  const [reloadPatientGroupList, setReloadPatientGroupList] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleManageGroup = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAnchorClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleManageGroup}
      >
        Manage groups
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleAnchorClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            setOpenCreatePatientGroupDialog(true);
            handleAnchorClose();
          }}
        >
          Create new group
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenPatientGroupListDialog(true);
            handleAnchorClose();
          }}
        >
          Edit existing group
        </MenuItem>
      </Menu>
      <CreatePatientGroupDialog
        openCreatePatientGroupDialog={openCreatePatientGroupDialog}
        setOpenCreatePatientGroupDialog={setOpenCreatePatientGroupDialog}
        setReloadPatientGroupList={setReloadPatientGroupList}
      />

      <PatientGroupListDialog
        openPatientGroupListDialog={openPatientGroupListDialog}
        setOpenPatientGroupListDialog={setOpenPatientGroupListDialog}
        reloadPatientGroupList={reloadPatientGroupList}
        setReloadPatientGroupList={setReloadPatientGroupList}
      />
    </>
  );
}

export default PatientGroupsContainer;
