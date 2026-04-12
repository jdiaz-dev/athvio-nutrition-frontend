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
      style={{ marginRight: '30px' }}
    >
      {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
