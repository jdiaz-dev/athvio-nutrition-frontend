// material-ui
import Badge from '@mui/material/Badge';

// project imports
import AvatarStatus from './AvatarStatus';
import { getImageUrl, ImagePath } from 'src/modules/Lab/lab6/utils/getImageUrl';

// types
import Avatar from 'src/modules/Lab/lab6/components/extended/Avatar';
import { UserProfile } from 'src/shared/types/auth';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { Commenter } from 'src/modules/patients/patient-console/chat/adapters/out/chat';

// ==============================|| CHAT USER AVATAR WITH STATUS ICON ||============================== //

interface UserAvatarProps {
  user: UserProfile;
}

//here: use to queries(get professionald and patient to get the photo), in lab6
export default function CommenterAvatar({ commenter }: { commenter: Commenter }) {
  const commenterState =
    commenter === Commenter.PATIENT
      ? useSelector((state: ReduxStates) => state.patient).user
      : useSelector((state: ReduxStates) => state.professional).user;

  return (
    <Badge
      overlap="circular"
      //todo: check status of the user
      badgeContent={<AvatarStatus status={'available'} />}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiBox-root': { width: 6, height: 6 },
        'padding': 0,
        'minWidth': 12,
        '& svg': { bgcolor: 'common.white', borderRadius: '50%' },
      }}
    >
      <Avatar alt={commenterState.firstname} src={commenterState.photo && getImageUrl(`${commenterState.photo}`, ImagePath.USERS)} />
    </Badge>
  );
}
