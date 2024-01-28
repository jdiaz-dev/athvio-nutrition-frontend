import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Chip, Menu, MenuItem, Stack } from '@mui/material';
import { ProfessionalIdContext } from 'src/App';
import { ManagePatientGroupRequest, ManagePatientGroupResponse } from 'src/modules/patients/patients/adapters/out/patient.types';
import { MANAGE_CLIENT_GROUP } from 'src/modules/patients/patients/adapters/out/PatientQueries';
import { ManagePatientGroupEnum } from 'src/shared/Consts';
import { PatientGroup } from 'src/shared/types/types';
import { PatientGroupsContext } from 'src/modules/patients/patients/adapters/in/components/PatientsContainer';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';

function ManagePatientGroup(props: { patient: string; assignedGroups: PatientGroup[] }) {
  const { patient, assignedGroups } = props;
  const professionalIdContext = useContext(ProfessionalIdContext);
  const patientGroupContext = useContext(PatientGroupsContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [createPatientHandler] = useMutation<ManagePatientGroupResponse, ManagePatientGroupRequest>(MANAGE_CLIENT_GROUP);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const managePatientGroupHandler = async (data: PatientGroup, action: ManagePatientGroupEnum) => {
    await createPatientHandler({
      variables: {
        input: {
          professional: professionalIdContext.professional,
          patientGroup: data._id,
          patient,
          action,
        },
      },
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  const assignedGroup = (group: PatientGroup) => <Chip label={group.groupName} style={{ backgroundColor: 'red' }} variant="outlined" />;

  const unassignedGroup = (group: PatientGroup) => (
    <Chip label={group.groupName} variant="outlined" onClick={() => void managePatientGroupHandler(group, ManagePatientGroupEnum.ADD)} />
  );

  const listAssignedGroups = (
    <Stack direction="row" spacing={1}>
      {assignedGroups.map((group) => (
        <Chip
          key={group._id}
          label={group.groupName}
          variant="filled"
          onDelete={() => {
            void managePatientGroupHandler(group, ManagePatientGroupEnum.REMOVE);
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
            {patientGroupContext.patientGroupList.map((group) => (
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
            {patientGroupContext.patientGroupList.map((group) => (
              <div key={group._id}>
                <Chip
                  label={group.groupName}
                  variant="outlined"
                  onClick={() => managePatientGroupHandler(group, ManagePatientGroupEnum.ADD)}
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

export default ManagePatientGroup;
