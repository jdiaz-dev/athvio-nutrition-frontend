import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useConfig from 'src/shared/hooks/useConfig';
import { ThemeMode } from 'src/shared/types/config';

export default function ThemeToggleButton() {
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();

  return (
    <IconButton
      onClick={() => {
        onChangeMode(mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT);
      }}
      color="inherit"
      size="small"
      style={{
        padding: '0px',
        marginRight: '30px',
        borderRadius: '35%',
        borderColor: theme.palette.mode === ThemeMode.DARK ? 'gray' : '#c6bcbc',
        border: `0.5px solid`,
      }}
    >
      {theme.palette.mode === ThemeMode.DARK ? (
        <LightModeIcon style={{ width: '19px', height: '19px' }} />
      ) : (
        <DarkModeIcon style={{ width: '19px', height: '19px' }} />
      )}
    </IconButton>
  );
}
