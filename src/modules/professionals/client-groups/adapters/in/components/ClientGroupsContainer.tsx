import { Button, Menu, MenuItem } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import ClientGroupList from 'src/modules/professionals/client-groups/adapters/in/dialogs/ClientGroupListDialog/ClientGroupListDialog';
import CreateClientGroupDialog from 'src/modules/professionals/client-groups/adapters/in/dialogs/CreateClientGroupDialog';

function ClientGroupsContainer() {
  const [openCreateClientGroupDialog, setOpenCreateClientGroupDialog] = useState(false);
  const [openClientGroupListDialog, setOpenClientGroupListDialog] = useState(false);
  const [reloadClientGroupList, setReloadClientGroupList] = useState(false);

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
            setOpenCreateClientGroupDialog(true);
            handleAnchorClose();
          }}
        >
          Create new group
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenClientGroupListDialog(true);
            handleAnchorClose();
          }}
        >
          Edit existing group
        </MenuItem>
      </Menu>
      <CreateClientGroupDialog
        openCreateClientGroupDialog={openCreateClientGroupDialog}
        setOpenCreateClientGroupDialog={setOpenCreateClientGroupDialog}
        setReloadClientGroupList={setReloadClientGroupList}
      />

      <ClientGroupList
        openClientGroupListDialog={openClientGroupListDialog}
        setOpenClientGroupListDialog={setOpenClientGroupListDialog}
        reloadClientGroupList={reloadClientGroupList}
        setReloadClientGroupList={setReloadClientGroupList}
      />
    </>
  );
}

export default ClientGroupsContainer;
