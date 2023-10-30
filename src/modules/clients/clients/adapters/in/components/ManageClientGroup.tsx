import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Chip, Menu, MenuItem, Stack } from '@mui/material';
import { ProfessionalIdContext } from 'src/App';
import { ManageClientGroupRequest, ManageClientGroupResponse } from 'src/modules/clients/clients/adapters/out/client.types';
import { MANAGE_CLIENT_GROUP } from 'src/modules/clients/clients/adapters/out/ClientQueries';
import { ManageClientGroupEnum } from 'src/shared/Consts';
import { ClientGroup } from 'src/shared/types/types';
import { ClientGroupsContext } from 'src/modules/clients/clients/adapters/in/components/ClientsContainer';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';

function ManageClientGroup(props: { client: string; assignedGroups: ClientGroup[] }) {
  const { client, assignedGroups } = props;
  const professionalIdContext = useContext(ProfessionalIdContext);
  const clientGroupContext = useContext(ClientGroupsContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [createClientHandler] = useMutation<ManageClientGroupResponse, ManageClientGroupRequest>(MANAGE_CLIENT_GROUP);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const manageClientGroupHandler = async (data: ClientGroup, action: ManageClientGroupEnum) => {
    await createClientHandler({
      variables: {
        input: {
          professional: professionalIdContext.professional,
          clientGroup: data._id,
          client,
          action,
        },
      },
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  const assignedGroup = (group: ClientGroup) => <Chip label={group.groupName} style={{ backgroundColor: 'red' }} variant="outlined" />;

  const unassignedGroup = (group: ClientGroup) => (
    <Chip label={group.groupName} variant="outlined" onClick={() => void manageClientGroupHandler(group, ManageClientGroupEnum.ADD)} />
  );

  const listAssignedGroups = (
    <Stack direction="row" spacing={1}>
      {assignedGroups.map((group) => (
        <Chip
          key={group._id}
          label={group.groupName}
          variant="filled"
          onDelete={() => {
            void manageClientGroupHandler(group, ManageClientGroupEnum.REMOVE);
          }}
        />
      ))}
      {/*  <Box
        sx={{
          '& > :not(style)': {
            m: 1,
          },
        }}
      >
        <IconButton aria-label="Example">
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>

      </Box> */}
      <Chip label="+" variant="outlined" onClick={handleAnchorOpen} />

      {/* <Box
        sx={{
          '& > :not(style)': {
            m: 2,
          },
        }}
      >
        <Icon color="primary" onClick={handleAnchorOpen}>
          add_circle
        </Icon>
      </Box> */}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleAnchorClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disableRipple>
          <div>
            {clientGroupContext.clientGroupList.map((group) => (
              <div key={group._id}>{assignedGroups.find((g) => g._id === group._id) ? assignedGroup(group) : unassignedGroup(group)}</div>
            ))}
          </div>
        </MenuItem>
      </Menu>
    </Stack>
  );

  const listUnassignedGroups = (
    <div>
      <Chip label="+ Add to group" variant="outlined" onClick={handleAnchorOpen} />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleAnchorClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disableRipple>
          <div>
            {clientGroupContext.clientGroupList.map((group) => (
              <div key={group._id}>
                <Chip
                  label={group.groupName}
                  variant="outlined"
                  onClick={() => manageClientGroupHandler(group, ManageClientGroupEnum.ADD)}
                />
              </div>
            ))}
          </div>
        </MenuItem>
      </Menu>
    </div>
  );

  return <>{assignedGroups.length > 0 ? listAssignedGroups : listUnassignedGroups}</>;
}

export default ManageClientGroup;
