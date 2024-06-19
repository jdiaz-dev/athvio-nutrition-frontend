// material-ui
import Badge from '@mui/material/Badge';

// project imports
import AvatarStatus from './AvatarStatus';
import { getImageUrl, ImagePath } from 'src/modules/Lab/lab6/utils/getImageUrl';

// types
import Avatar from 'src/modules/Lab/lab6/components/extended/Avatar';
import { UserProfile } from 'src/shared/types/auth';

// ==============================|| CHAT USER AVATAR WITH STATUS ICON ||============================== //

interface UserAvatarProps {
  user: UserProfile;
}

//here: use to queries(get professionald and patient to get the photo), in lab6
export default function CommenterAvatar({ user }: UserAvatarProps) {
  return (
    <Badge
      overlap="circular"
      badgeContent={<AvatarStatus status={'available'} />}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiBox-root': { width: 6, height: 6 },
        padding: 0,
        minWidth: 12,
        '& svg': { bgcolor: 'common.white', borderRadius: '50%' }
      }}
    >
      <Avatar alt={'user.name'} src={user.avatar && getImageUrl(`${user.avatar}`, ImagePath.USERS)} />
    </Badge>
  );
}
