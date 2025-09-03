import React, { useContext, useState } from 'react';

import { Button, Menu, MenuItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation } from '@apollo/client';
import {
  DeletePatientGroupsRequest,
  DeletePatientGroupsResponse,
} from 'src/modules/professionals/patient-groups/adapters/out/PatientGroup.types';
import { DELETE_CLIENT_GROUP } from 'src/modules/professionals/patient-groups/adapters/out/PatientGroupQueries';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';

function DeletePatientGroup({
  patientGroup,
  setReloadPatientGroupList,
}: {
  patientGroup: string;
  setReloadPatientGroupList: (reload: boolean) => void;
}) {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const [deletePatientGroupHandler] = useMutation<DeletePatientGroupsResponse, DeletePatientGroupsRequest>(DELETE_CLIENT_GROUP);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };
  const deletePatientGroup = async () => {
    const input = {
      professional: authContext.professional,
      patientGroup,
    };
    await deletePatientGroupHandler({
      variables: {
        input,
      },
    });
    setAnchorEl(null);
    setReloadPatientGroupList(true);
    reloadRecordListContext.setReloadRecordList(true);
  };
  return (
    <>
      <DeleteForeverIcon style={{ cursor: 'pointer' }} onClick={handleAnchorOpen} />
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
                  void deletePatientGroup();
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

export default DeletePatientGroup;
