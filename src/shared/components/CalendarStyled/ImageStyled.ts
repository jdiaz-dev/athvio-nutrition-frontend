// material-ui
import { styled, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface Props {
  theme: Theme;
  forDrawer: boolean;
}

const ImageStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, forDrawer }: Props) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: forDrawer ? 'flex-start' : 'center',
  paddingLeft: theme.spacing(forDrawer ? 3 : 0),
}));

export default ImageStyled;
