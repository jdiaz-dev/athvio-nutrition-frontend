import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Chip, Menu, MenuItem, Stack } from '@mui/material';
import { ManagePatientGroupRequest, ManagePatientGroupResponse } from 'src/modules/patients/patients/adapters/out/patient.types';
import { MANAGE_PATIENT_GROUP } from 'src/modules/patients/patients/adapters/out/PatientQueries';
import { ManagePatientGroupEnum } from 'src/shared/Consts';
import { PatientGroup } from 'src/shared/types/types';
import { PatientGroupsContext } from 'src/modules/patients/patients/adapters/in/components/PatientsContainer';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { useTranslation } from 'react-i18next';

function ManagePatientGroup(props: { patient: string; assignedGroups: PatientGroup[] }) {
  const { t } = useTranslation();
  const { patient, assignedGroups } = props;
  const authContext = useContext(AuthContext);
  const patientGroupContext = useContext(PatientGroupsContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [createPatientHandler] = useMutation<ManagePatientGroupResponse, ManagePatientGroupRequest>(MANAGE_PATIENT_GROUP);

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
          professional: authContext.professional,
          patientGroup: data.uuid,
          patient,
          action,
        },
      },
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  const assignedGroup = (group: PatientGroup) => <Chip label={group.groupName} variant="outlined" />;

  const unassignedGroup = (group: PatientGroup) => (
    <Chip label={group.groupName} variant="outlined" onClick={() => void managePatientGroupHandler(group, ManagePatientGroupEnum.ADD)} />
  );

  const listAssignedGroups = (
    <Stack direction="row" spacing={1}>
      {assignedGroups.map((group) => (
        <Chip
          key={group.uuid}
          label={group.groupName}
          variant="filled"
          onDelete={() => {
            void managePatientGroupHandler(group, ManagePatientGroupEnum.REMOVE);
          }}
          color="success"
        />
      ))}

      <Chip label="+" variant="outlined" onClick={handleAnchorOpen} />

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
              <div key={group.uuid}>{assignedGroups.find((g) => g.uuid === group.uuid) ? assignedGroup(group) : unassignedGroup(group)}</div>
            ))}
          </div>
        </MenuItem>
      </Menu>
    </Stack>
  );

  const listUnassignedGroups = (
    <div>
      <Chip label={`+ ${t('patientModule.buttons.addToGroup')}`} variant="outlined" onClick={handleAnchorOpen} />

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
              <div key={group.uuid}>
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
