import { useState, useEffect } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import { useMediaQuery, Button, ButtonGroup, Stack, Tooltip, Typography, GridProps } from '@mui/material';

// third-party
import { format } from 'date-fns';

// project import

// assets
import { AppstoreOutlined, LayoutOutlined, LeftOutlined, OrderedListOutlined, PicCenterOutlined, RightOutlined } from '@ant-design/icons';//x
import IconButton from 'src/shared/components/IconButton';

// constant
const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: AppstoreOutlined
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: LayoutOutlined
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: PicCenterOutlined
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: OrderedListOutlined
  }
];

// ==============================|| CALENDAR - TOOLBAR ||============================== //

export interface ToolbarProps {
  date: number | Date;
  view: string;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickToday: () => void;
  onChangeView: (s: string) => void;
  sx?: GridProps['sx'];
}

const Toolbar = ({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView, sx, ...others }: ToolbarProps) => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [viewFilter, setViewFilter] = useState(viewOptions);

  useEffect(() => {
    if (matchDownSM) {
      const filter = viewOptions.filter((item) => item.value !== 'dayGridMonth' && item.value !== 'timeGridWeek');
      setViewFilter(filter);
    } else {
      setViewFilter(viewOptions);
    }
  }, [matchDownSM]);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={matchDownSM ? 1 : 3} sx={{ pb: 3 }}>
      <Button variant="outlined" onClick={onClickToday} size={matchDownSM ? 'small' : 'medium'}>
        Today
      </Button>
      <Stack direction="row" alignItems="center" spacing={matchDownSM ? 0.5 : 3}>
        <IconButton onClick={onClickPrev} size={matchDownSM ? 'small' : 'large'}>
          <LeftOutlined />
        </IconButton>
        <Typography variant={matchDownSM ? 'h5' : 'h3'} color="textPrimary">
          {format(date, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={onClickNext} size={matchDownSM ? 'small' : 'large'}>
          <RightOutlined />
        </IconButton>
      </Stack>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {viewFilter.map((viewOption) => {
          const Icon = viewOption.icon;
          return (
            <Tooltip title={viewOption.label} key={viewOption.value}>
              <Button
                disableElevation
                size={matchDownSM ? 'small' : 'medium'}
                variant={viewOption.value === view ? 'contained' : 'outlined'}
                onClick={() => onChangeView(viewOption.value)}
              >
                <Icon style={{ fontSize: '1.3rem' }} />
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </Stack>
  );
};

export default Toolbar;
