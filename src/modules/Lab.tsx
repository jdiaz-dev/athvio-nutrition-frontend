// MacroPlanner.tsx
import * as React from "react";
import {
  Box,
  Grid,
  Slider,
  TextField,
  Typography,
  InputAdornment,
  Switch,
  Stack,
} from "@mui/material";

type MacroKey = "fat" | "carb" | "protein";

type MacroConfig = {
  key: MacroKey;
  label: string;
  color: string;        // slider color
  kcalPerGram: number;  // 9 for fat, 4 for carb/protein
  rangePct: [number, number];
  icon?: React.ReactNode;
};

const MACROS: MacroConfig[] = [
  { key: "fat",    label: "Lípidos",             color: "#F2C200", kcalPerGram: 9, rangePct: [20, 35] },
  { key: "carb",   label: "Hidratos de carbono", color: "#F6A57A", kcalPerGram: 4, rangePct: [45, 65] },
  { key: "protein",label: "Proteínas",           color: "#94A3FF", kcalPerGram: 4, rangePct: [10, 35] },
];

type MacroState = Record<MacroKey, { pct: number; enabled: boolean }>;

export default function MacroPlanner() {
  const [totalKcal, setTotalKcal] = React.useState(2600);
  const [weightKg, setWeightKg] = React.useState(70);

  const [macros, setMacros] = React.useState<MacroState>({
    fat:     { pct: 47, enabled: true },
    carb:    { pct: 12, enabled: false },
    protein: { pct: 32, enabled: true },
  });

  const setPct = (key: MacroKey, pct: number) =>
    setMacros((m) => ({ ...m, [key]: { ...m[key], pct } }));

  const toggle = (key: MacroKey) =>
    setMacros((m) => ({ ...m, [key]: { ...m[key], enabled: !m[key].enabled } }));

  const pctToGrams = (pct: number, kcalPerGram: number) =>
    Math.round(((pct / 100) * totalKcal) / kcalPerGram);

  return (
    <Stack spacing={2}>
      {/* Top controls (optional) */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm="auto">
          <TextField
            label="Calorías del plan"
            type="number"
            size="small"
            value={totalKcal}
            onChange={(e) => setTotalKcal(Number(e.target.value || 0))}
            InputProps={{ endAdornment: <InputAdornment position="end">kcal</InputAdornment> }}
          />
        </Grid>
        <Grid item xs={12} sm="auto">
          <TextField
            label="Peso"
            type="number"
            size="small"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value || 0))}
            InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment> }}
          />
        </Grid>
      </Grid>

      {/* Rows */}
      {MACROS.map(({ key, label, color, kcalPerGram, rangePct }) => {
        const { pct, enabled } = macros[key];
        const grams = pctToGrams(pct, kcalPerGram);
        const gPerKg = weightKg ? (grams / weightKg) : 0;

        return (
          <Box key={key} sx={{ py: 1.25, borderBottom: "1px solid", borderColor: "divider" }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              columns={{ xs: 12, md: 24 }}
            >
              {/* Icon + label */}
              <Grid item xs={12} md={7}>
                <Grid container alignItems="center" columnGap={1}>
                  <Grid item>
                    <Switch
                      checked={enabled}
                      onChange={() => toggle(key)}
                      size="small"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: color },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography fontWeight={600}>{label}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* % input */}
              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  type="number"
                  value={pct}
                  onChange={(e) => setPct(key, Math.max(0, Math.min(100, Number(e.target.value || 0))))}
                  InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  sx={{ width: 90 }}
                  disabled={!enabled}
                />
              </Grid>

              {/* Slider */}
              <Grid item xs={12} md={6}>
                <Slider
                  value={pct}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(_, v) => setPct(key, v as number)}
                  disabled={!enabled}
                  sx={{
                    "& .MuiSlider-track": { backgroundColor: color },
                    "& .MuiSlider-rail": { opacity: 0.25 },
                    "& .MuiSlider-thumb": { backgroundColor: "white", border: "2px solid", borderColor: color },
                  }}
                />
              </Grid>

              {/* grams */}
              <Grid item xs={12} md={3}>
                <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                  <b>{grams}</b> g
                </Typography>
              </Grid>

              {/* g/kg */}
              <Grid item xs={12} md={3}>
                <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                  {gPerKg.toFixed(2)} g/kg
                </Typography>
              </Grid>

              {/* range */}
              <Grid item xs={12} md={2.5}>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                  {rangePct[0]} - {rangePct[1]} %
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Stack>
  );
}
