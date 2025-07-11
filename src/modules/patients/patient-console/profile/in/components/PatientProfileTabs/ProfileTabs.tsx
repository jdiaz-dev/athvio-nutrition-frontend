import { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ProfileTab from './ProfileTab';

import MoreOutlined from '@ant-design/icons/MoreOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';

import defaultImages from '/public/default.png';
import MainCard from 'src/shared/components/MainCard/MainCard';
import Avatar from 'src/modules/patients/patient-console/chat/adapters/in/components/Avatar';
import IconButton from 'src/shared/components/IconButton';
import { ThemeMode } from 'src/shared/types/config';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';

interface Props {
  focusInput: () => void;
}

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

export default function ProfileTabs({ focusInput }: Props) {
  const patientState = useSelector((state: ReduxStates) => state.patient);

  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(defaultImages);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [anchorEl, setAnchorEl] = useState<Element | (() => Element) | null | undefined>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              variant="light"
              color="secondary"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreOutlined />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                component={Link}
                to="/apps/profiles/user/personal"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    focusInput();
                  });
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disabled>
                Delete
              </MenuItem>
            </Menu>
          </Stack>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avtar"
              sx={{
                'position': 'relative',
                'borderRadius': '50%',
                'overflow': 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                'cursor': 'pointer',
              }}
            >
              <Avatar alt="Avatar 1" src={avatar} sx={{ width: 124, height: 124, border: '1px dashed' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avtar"
              placeholder="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">
                {patientState.user.firstname} {patientState.user.lastname}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
}
