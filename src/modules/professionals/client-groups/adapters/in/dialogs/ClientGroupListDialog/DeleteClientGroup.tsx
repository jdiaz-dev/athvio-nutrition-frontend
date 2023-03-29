import React, { useContext, useState } from 'react';

import { Button, Menu, MenuItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation } from '@apollo/client';
import {
  DeleteClientGroupsRequest,
  DeleteClientGroupsResponse,
} from 'src/modules/professionals/client-groups/adapters/out/ClientGroup.types';
import { DELETE_CLIENT_GROUP } from 'src/modules/professionals/client-groups/adapters/out/ClientGroupQueries';
import { ProfessionalIdContext, ReloadClientListContext } from 'src/App';

function DeleteClientGroup({
  clientGroup,
  setReloadClientGroupList,
}: {
  clientGroup: string;
  setReloadClientGroupList: (reload: boolean) => void;
}) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadClientListContext = useContext(ReloadClientListContext);

  const [deleteClientGroupHandler] = useMutation<DeleteClientGroupsResponse, DeleteClientGroupsRequest>(
    DELETE_CLIENT_GROUP,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };
  const deleteClientGroup = async () => {
    const input = {
      professional: professionalIdContext.professional,
      clientGroup,
    };
    await deleteClientGroupHandler({
      variables: {
        input,
      },
    });
    setAnchorEl(null);
    setReloadClientGroupList(true);
    reloadClientListContext.setReloadClientList(true);
  };
  return (
    <>
      <DeleteForeverIcon onClick={handleAnchorOpen} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleAnchorClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <div>
            <div>Delete this group?</div>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleAnchorClose}
              >
                Cancel
              </Button>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={() => {
                  void deleteClientGroup();
                }}
              >
                Delete group
              </Button>
            </div>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
}

export default DeleteClientGroup;
