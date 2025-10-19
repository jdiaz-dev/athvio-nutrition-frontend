// material-ui
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'src/shared/types/config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Athvio" width="100" />
     *
     */
    <>
      <svg width="108" height="35" viewBox="0 0 108 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.63564 15.8644L6.94797 13.552L6.95038 13.5496H11.3006L9.56969 15.2806L9.12278 15.7275L7.35024 17.5L7.56977 17.7201L17.5 27.6498L27.6498 17.5L25.8766 15.7275L25.7518 15.602L23.6994 13.5496H28.0496L28.052 13.552L29.8644 15.3644L32 17.5L17.5 32L3 17.5L4.63564 15.8644ZM17.5 3L25.8784 11.3784H21.5282L17.5 7.35024L13.4718 11.3784H9.12158L17.5 3Z"
          fill={theme.palette.primary.dark}
        />
        <path
          d="M7.35025 17.5L9.1228 15.7275L9.5697 15.2805L7.83937 13.5496H6.95039L6.94798 13.552L4.63564 15.8644L6.8551 18.073L7.35025 17.5Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M25.8767 15.7275L27.6498 17.5L27.4743 17.6755L27.4749 17.6761L29.8644 15.3644L28.0521 13.552L28.0497 13.5496H27.8736L25.7518 15.602L25.8767 15.7275Z"
          fill="url(#paint1_linear)"
        />
        <path
          d="M6.94549 13.5496L6.9479 13.552L9.12272 15.7275L17.4999 24.1041L28.0544 13.5496H6.94549Z"
          fill={theme.palette.primary.main}
        />
        {/* Athvio Text */}
        {/* A */}
        <path
          d="M48.5 10H45.3L40 26H42.9L44.1 22.2H49.7L50.9 26H53.8L48.5 10ZM44.9 20L46.9 13.5H47L49 20H44.9Z"
          fill={theme.palette.mode === ThemeMode.DARK || reverse ? theme.palette.common.white : theme.palette.common.black}
          fillOpacity="0.85"
        />
        {/* t */}
        <path
          d="M59.5 16H62V14H59.5V11H56.7V14H54.8V16H56.7V22.5C56.7 24.8 58.2 26 60.3 26C60.9 26 61.4 25.9 61.7 25.8L61.3 23.7C61.1 23.7 60.8 23.8 60.5 23.8C59.8 23.8 59.5 23.5 59.5 22.5V16Z"
          fill={theme.palette.mode === ThemeMode.DARK || reverse ? theme.palette.common.white : theme.palette.common.black}
          fillOpacity="0.85"
        />
        {/* h */}
        <path
          d="M64.2 10V26H67V19C67 17.3 68 16.2 69.5 16.2C70.9 16.2 71.6 17 71.6 18.5V26H74.4V18C74.4 15.2 72.8 13.8 70.4 13.8C69 13.8 67.8 14.4 67.2 15.6H67.1V10H64.2Z"
          fill={theme.palette.mode === ThemeMode.DARK || reverse ? theme.palette.common.white : theme.palette.common.black}
          fillOpacity="0.85"
        />
        {/* v */}
        <path
          d="M82 26L86.5 14H83.6L80.9 22.1H80.8L78.1 14H75L79.5 26H82Z"
          fill={theme.palette.mode === ThemeMode.DARK || reverse ? theme.palette.common.white : theme.palette.common.black}
          fillOpacity="0.85"
        />
        {/* i */}
        <path
          d="M88 12C88 12.8 88.7 13.5 89.5 13.5C90.3 13.5 91 12.8 91 12C91 11.2 90.3 10.5 89.5 10.5C88.7 10.5 88 11.2 88 12ZM88.1 26H90.9V14H88.1V26Z"
          fill={theme.palette.mode === ThemeMode.DARK || reverse ? theme.palette.common.white : theme.palette.common.black}
          fillOpacity="0.85"
        />
        {/* o */}
        <path
          d="M97.5 26.2C101 26.2 103 24.2 103 20C103 15.8 101 13.8 97.5 13.8C94 13.8 92 15.8 92 20C92 24.2 94 26.2 97.5 26.2ZM97.5 24C96 24 95.3 22.7 95.3 20C95.3 17.3 96 16 97.5 16C99 16 99.7 17.3 99.7 20C99.7 22.7 99 24 97.5 24Z"
          fill={theme.palette.mode === ThemeMode.DARK || reverse ? theme.palette.common.white : theme.palette.common.black}
          fillOpacity="0.85"
        />
        <defs>
          <linearGradient id="paint0_linear" x1="8.62526" y1="14.0888" x2="5.56709" y2="17.1469" gradientUnits="userSpaceOnUse">
            <stop stopColor={theme.palette.primary.darker} />
            <stop offset="0.9637" stopColor={theme.palette.primary.dark} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="26.2675" y1="14.1279" x2="28.7404" y2="16.938" gradientUnits="userSpaceOnUse">
            <stop stopColor={theme.palette.primary.darker} />
            <stop offset="1" stopColor={theme.palette.primary.dark} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default LogoMain;