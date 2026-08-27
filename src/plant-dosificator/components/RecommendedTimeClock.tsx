import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface RecommendedTimeClockProps {
  schedules: string[]; // e.g. ['8am', '1pm', '6pm']
}

const CLOCK_SIZE = 220;
const CENTER = CLOCK_SIZE / 2;
const RADIUS = CENTER - 24;

/** Parses a schedule string like '8am' or '1pm' into a 0-23 hour value. */
const parseHour = (schedule: string): number | null => {
  const match = schedule.trim().toLowerCase().match(/^(\d{1,2})(am|pm)$/);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const meridiem = match[2];
  if (meridiem === 'am') {
    if (hour === 12) hour = 0;
  } else if (meridiem === 'pm') {
    if (hour !== 12) hour += 12;
  }
  return hour;
};

/** Converts a 24h hour value into an angle on a 12-hour analog dial. */
const hourToAngleDeg = (hour: number): number => {
  const hourOn12 = hour % 12;
  return hourOn12 * 30 - 90; // 30 deg per hour, offset so 12 is at top
};

const polarToCartesian = (angleDeg: number, radius: number) => {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
};

/**
 * Result section, part B: circular clock highlighting the hours of day
 * recommended for consuming the selected plant preparation.
 */
const RecommendedTimeClock: React.FC<RecommendedTimeClockProps> = ({ schedules }) => {
  const parsedHours = schedules
    .map((s) => ({ label: s, hour: parseHour(s) }))
    .filter((entry): entry is { label: string; hour: number } => entry.hour !== null);

  const tickMarks = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AccessTimeIcon color="primary" />
        <Typography variant="h6" component="h3">
          Horario recomendado
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <svg width={CLOCK_SIZE} height={CLOCK_SIZE} role="img" aria-label="Reloj de horarios recomendados">
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="var(--mui-palette-background-paper, #fff)"
            stroke="var(--mui-palette-primary-main, #3F6C51)"
            strokeWidth={2}
          />

          {tickMarks.map((hourLabel) => {
            const angle = hourToAngleDeg(hourLabel);
            const outer = polarToCartesian(angle, RADIUS - 4);
            const inner = polarToCartesian(angle, RADIUS - 14);
            const textPos = polarToCartesian(angle, RADIUS - 26);
            return (
              <g key={hourLabel}>
                <line
                  x1={outer.x}
                  y1={outer.y}
                  x2={inner.x}
                  y2={inner.y}
                  stroke="#8A9990"
                  strokeWidth={1.5}
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fontSize={11}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#5B6960"
                >
                  {hourLabel}
                </text>
              </g>
            );
          })}

          {parsedHours.map(({ label, hour }) => {
            const angle = hourToAngleDeg(hour);
            const point = polarToCartesian(angle, RADIUS - 40);
            const isPM = hour >= 12;
            return (
              <g key={label}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={9}
                  fill={isPM ? '#B5651D' : '#3F6C51'}
                  stroke="#fff"
                  strokeWidth={1.5}
                />
              </g>
            );
          })}

          <circle cx={CENTER} cy={CENTER} r={4} fill="#26302A" />
        </svg>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {schedules.map((schedule) => (
            <Chip key={schedule} label={schedule} size="small" color="primary" variant="outlined" />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default RecommendedTimeClock;
