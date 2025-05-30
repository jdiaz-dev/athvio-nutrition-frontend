// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// types
import { ThemeDirection } from 'src/shared/types/config';

// ==============================|| CALENDAR - STYLED ||============================== //

interface StyledProps {
  withStylesForCustomScroller?: boolean;
}

const ExperimentalStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'withStylesForCustomScroller', // Ensures 'withStylesForCustomScroller' is not passed to the DOM
})<StyledProps>(({ theme, withStylesForCustomScroller }) => ({
  'width': '100%',
  'marginLeft': -1,
  'transition': 'width 0.4s ease-in-out, opacity 0.3s ease-in-out',

  // hide license message
  '& .fc-license-message': {
    display: 'none',
  },

  ...(withStylesForCustomScroller && {
    '& .fc .fc-daygrid-body': {
      overflowY: 'auto !important',
      maxHeight: 'calc(100vh - 150px) !important',
    },

    '& .fc .fc-scroller': {
      overflowY: 'auto !important',
      maxHeight: '100%',
    },

    '.css-uk8nkx-externalBox': {
      height: '100%',
      overflowY: 'auto',
    },
  }),

  // basic style
  '& .fc': {
    '--fc-bg-event-opacity': 1,
    '--fc-border-color': theme.palette.divider,
    '--fc-daygrid-event-dot-width': '10px',
    '--fc-today-bg-color': theme.palette.primary.lighter,
    '--fc-list-event-dot-width': '10px',
    '--fc-event-border-color': theme.palette.primary.dark,
    '--fc-now-indicator-color': theme.palette.error.main,
    'color': theme.palette.text.primary,
    'backgroundColor': theme.palette.background.paper,
    'fontFamily': theme.typography.fontFamily,
    'transition': 'opacity 0.3s ease-in-out',
  },

  // Calendar cells
  '& .fc .fc-daygrid-day': {
    position: 'relative', // Ensures the cell is the reference point for its pseudo-element
    paddingBottom: '20px', // Reserve space for the turquoise line
  },

  // Line aligned at the bottom
  /* '& .fc .fc-daygrid-day::after': {
    content: '""',
    position: 'absolute',
    bottom: 4,
    left: 2,
    width: '98%',
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    zIndex: 1,
  }, */

  // date text
  '& .fc .fc-daygrid-day-top': {
    'display': 'grid',
    '& .fc-daygrid-day-number': {
      textAlign: 'center',
      marginTop: 12,
      marginBottom: 12,
      color: '#1E8E98' /* 'turquoise' */,
      fontWeight: 'bold',
    },
  },

  // weekday
  '& .fc .fc-col-header-cell': {
    backgroundColor: theme.palette.grey[100],
  },

  '& .fc .fc-col-header-cell-cushion': {
    color: theme.palette.grey[900],
    padding: 16,
  },

  // events
  '& .fc-direction-ltr .fc-daygrid-event.fc-event-end, .fc-direction-rtl .fc-daygrid-event.fc-event-start': {
    marginLeft: 4,
    marginBottom: 6,
    borderRadius: 4,
    backgroundColor: 'transparent', //to void co   lor in event, before the color was : theme.palette.primary.main,
    // backgroundColor: theme.palette.primary.main,
    // position: 'absolute',
    border: 'none',
  },

  //here: custom height
  '.css-uk8nkx-externalBox': {
    height: '100%',
    // minHeight: '100%',
  },

  '& .fc-h-event .fc-event-main': {
    padding: 4,
    paddingLeft: 8,
  },

  // popover when multiple events
  '& .fc .fc-more-popover': {
    border: 'none',
    borderRadius: 6,
    zIndex: 1200,
  },

  '& .fc .fc-more-popover .fc-popover-body': {
    backgroundColor: theme.palette.grey[200],
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  '& .fc .fc-popover-header': {
    padding: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
  },

  // agenda view
  '& .fc-theme-standard .fc-list-day-cushion': {
    backgroundColor: theme.palette.grey[100],
  },

  //to remove the background color of the current day
  '.fc-day-today': {
    backgroundColor: 'transparent !important' /* Remove background highlight */,
    fontWeight: 'normal !important' /* Remove bold text */,
  },
  '& .fc .fc-day': {
    cursor: 'pointer',
  },

  '& .fc .fc-timeGridDay-view .fc-timegrid-slot': {
    backgroundColor: theme.palette.background.paper,
  },

  '& .fc .fc-timegrid-slot': {
    cursor: 'pointer',
  },

  '& .fc .fc-list-event:hover td': {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[100],
  },

  '& .fc-timegrid-event-harness-inset .fc-timegrid-event, .fc-timegrid-event.fc-event-mirror, .fc-timegrid-more-link': {
    padding: 8,
    margin: 2,
  },
  ...(theme.direction === ThemeDirection.RTL && { overflow: 'hidden', paddingTop: '8px' }),
}));

export default ExperimentalStyled;
