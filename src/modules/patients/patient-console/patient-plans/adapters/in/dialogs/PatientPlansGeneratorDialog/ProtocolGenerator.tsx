import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Collapse, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNutritionBuilder } from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderActions';
import { Dayjs } from 'dayjs';
import { useParams } from 'react-router-dom';
import GeneralPatientPlanDefinition from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/GeneralPatientPlanDefinition';
import GeneralPatientPlanDefinitionForNaturist from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/GeneralPatientPlanDefinitionForNaturist';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { MessagesForOkDialog } from 'src/shared/Consts';
import MessageDialog from 'src/shared/dialogs/MessageDialog';

// ─── Types ───────────────────────────────────────────────────────────────────

type TabKey = 'limpiar' | 'equilibrar' | 'suplementar' | 'prevenir' | 'habitos';
type AllTabKey = TabKey | 'preview';

interface ItemState {
  label: string;
  checked: boolean;
}

interface SectionState {
  subtitle: string;
  items: ItemState[];
}

type DataState = Record<TabKey, SectionState[]>;

interface ResultSection {
  subtitle: string;
  selected: string[];
}

type ResultData = Partial<Record<TabKey, ResultSection[]>>;

interface TabDef {
  key: AllTabKey;
  label: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TAB_COLORS: Record<TabKey, string> = {
  limpiar: '#4caf50',
  equilibrar: '#f44336',
  suplementar: '#29b6f6',
  prevenir: '#1565c0',
  habitos: '#fdd835',
};

const TAB_LABELS: Record<TabKey, string> = {
  limpiar: 'LIMPIAR',
  equilibrar: 'EQUILIBRAR',
  suplementar: 'SUPLEMENTAR',
  prevenir: 'PREVENIR',
  habitos: 'HÁBITOS',
};

interface InitialSection {
  subtitle: string;
  items: string[];
}

const INITIAL_DATA: Record<TabKey, InitialSection[]> = {
  limpiar: [
    {
      subtitle: 'Adaptógenos',
      items: [
        'Diente de león',
        'Cardo mariano',
        'Boldo',
        'Alcachofa',
        'Cola de caballo',
        'Ortiga verde',
        'Gengibre',
        'Regaliz (raiz)',
        'Ajengo',
        'Paico',
        'Boldo',
        'Epazote',
        'Muña',
      ],
    },
    {
      subtitle: 'Alimentos',
      items: [
        'Limón',
        'Ajo crudo',
        'Betarraga',
        'Apio',
        'Cúrcuma',
        'Pimienta negra',
        'Agua de coco',
        'Agua de mar',
        'Chlorella',
        'Espirulina',
      ],
    },
  ],
  equilibrar: [
    {
      subtitle: 'Fermentados y probióticos',
      items: ['Kéfir de leche', 'Kéfir de agua', 'Kombucha', 'Chucrut', 'Kimchi', 'Yogur natural', 'Miso', 'Tempeh'],
    },
    {
      subtitle: 'Alimentos',
      items: ['Avena', 'Plátano verde cocido', 'Cebolla', 'Puerro', 'Espárrago', 'Manzana con cáscara', 'Alcachofa'],
    },
  ],
  suplementar: [
    {
      subtitle: 'Alimentos',
      items: [
        'Maca',
        'Camu camu',
        'Polen de abeja',
        'Jalea real',
        'Bayas de Goji',
        'Sardinas',
        'Trucha',
        'Palta',
        'Aceituna',
        'Huevos',
        'Queso crudo',
        'Huevas de pescado',
        'Caldo de huesos',
        'Carne de res de pastoreo',
      ],
    },
    /* {
      subtitle: 'Minerales y vitaminas',
      items: ['Magnesio', 'Zinc', 'Vitamina D3 + K2', 'Hierro', 'Omega-3', 'Vitamina B12', 'Vitamina C'],
    }, */
    // { subtitle: 'Hongos medicinales', items: ['Reishi', "Lion's Mane", 'Chaga', 'Cordyceps'] },
  ],
  prevenir: [
    /* {
      subtitle: 'Adaptógenos y antioxidantes',
      items: ['Cúrcuma', 'Té verde', 'Romero', 'Tomillo', 'Uña de gato', 'Sangre de grado', 'Berberina'],
    }, */
    {
      subtitle: 'Alimentos preventivos',
      items: [
        'Aceite de oliva extra virgen',
        'Frutos rojos',
        'Nueces',
        'Almendras',
        'Repollo',
        'Lentejas',
        'Garbanzos',
        'Brócoli',
        'Coliflor',
        'Zanahoria',
        'Espinaca',
        'Frutas cítricas',
      ],
    },
  ],
  /* habitos: [
    {
      subtitle: 'Rutina diaria',
      items: [
        'Ayuno intermitente 16/8',
        'Exposición solar 20 min/día',
        'Sueño reparador 7-8h',
        'Hidratación 2-3 litros/día',
        'Movimiento diario',
        'Meditación',
      ],
    },
    {
      subtitle: 'Hábitos alimenticios',
      items: ['Comer despacio', 'Sin pantallas al comer', 'No picar entre comidas', 'Masticar bien', 'Horarios fijos'],
    },
    {
      subtitle: 'Bienestar mental',
      items: ['Gestión del estrés', 'Respiración consciente', 'Conexión con la naturaleza', 'Journaling', 'Lectura diaria'],
    },
  ], */
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildState(): DataState {
  const d = {} as DataState;
  (Object.keys(INITIAL_DATA) as TabKey[]).forEach((k) => {
    d[k] = INITIAL_DATA[k].map((sec) => ({
      subtitle: sec.subtitle,
      items: sec.items.map((label) => ({ label, checked: false })),
    }));
  });
  return d;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CbProps {
  color: string;
  checked: boolean;
  // onChange: () => void;
}

function Cb({ color, checked /* onChange */ }: CbProps): JSX.Element {
  return (
    <span
      // onClick={onChange}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 15,
        height: 15,
        flexShrink: 0,
        border: `2px solid ${color}`,
        borderRadius: 2,
        background: checked ? color : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.12s',
        marginTop: 2,
      }}
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 9 9">
          <polyline points="1,4.5 3.5,7 8,1.5" stroke="#111" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

interface SectionProps {
  tabKey: TabKey;
  section: SectionState;
  onToggle: (itemIndex: number) => void;
  onAdd: (label: string) => void;
}

function Section({ tabKey, section, onToggle, onAdd }: SectionProps): JSX.Element {
  const [adding, setAdding] = useState<boolean>(false);
  const [val, setVal] = useState<string>('');
  const color = TAB_COLORS[tabKey];

  const confirm = (): void => {
    if (val.trim()) {
      onAdd(val.trim());
      setVal('');
      setAdding(false);
    }
  };

  return (
    <div style={{ border: `1px solid ${color}`, borderRadius: 5, padding: '9px 12px', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ color: '#999', fontSize: 12 }}>{section.subtitle}</span>
        <button
          onClick={() => setAdding(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            background: 'transparent',
            border: `1px solid ${color}`,
            color,
            borderRadius: 4,
            padding: '2px 9px',
            fontSize: 11,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 600,
          }}
        >
          + Añadir
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: '3px 6px' }}>
        {section.items.map((item, idx) => (
          <label
            onClick={() => onToggle(idx)}
            key={idx}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 6, cursor: 'pointer', padding: '2px 0' }}
          >
            <Cb color={color} checked={item.checked} /* onChange={() => onToggle(idx)}  */ />
            <span style={{ fontSize: 12, color: '#ddd', lineHeight: 1.4 }}>{item.label}</span>
          </label>
        ))}
      </div>

      {adding && (
        <div style={{ display: 'flex', gap: 6, marginTop: 9, alignItems: 'center' }}>
          <input
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && confirm()}
            placeholder="Nombre del ítem..."
            style={{
              flex: 1,
              background: '#252525',
              border: `1px solid ${color}`,
              borderRadius: 4,
              color: '#ddd',
              padding: '4px 9px',
              fontSize: 12,
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <button
            onClick={confirm}
            style={{
              background: color,
              color: '#111',
              border: 'none',
              borderRadius: 4,
              padding: '4px 11px',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              setAdding(false);
              setVal('');
            }}
            style={{
              background: 'transparent',
              color: '#888',
              border: '1px solid #444',
              borderRadius: 4,
              padding: '4px 10px',
              fontSize: 11,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

interface PreviewProps {
  data: DataState;
}

function Preview({ data }: PreviewProps): JSX.Element {
  const keys: TabKey[] = ['limpiar', 'equilibrar', 'suplementar', 'prevenir' /*  'habitos' */];
  const hasAny = keys.some((k) => data[k].some((s) => s.items.some((i) => i.checked)));

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          padding: '8px 12px',
          background: '#252525',
          borderRadius: 5,
          marginBottom: 14,
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 11, color: '#888' }}>Leyenda:</span>
        {keys.map((k) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 12, height: 12, background: TAB_COLORS[k], borderRadius: 2 }} />
            <span style={{ fontSize: 11, color: '#bbb' }}>{TAB_LABELS[k]}</span>
          </div>
        ))}
      </div>

      {!hasAny && (
        <p style={{ color: '#555', fontSize: 12, textAlign: 'center', marginTop: 32 }}>
          Sin ítems seleccionados. Activa checkboxes en las otras pestañas.
        </p>
      )}

      {keys.map((k) => {
        const color = TAB_COLORS[k];
        const hasTab = data[k].some((s) => s.items.some((i) => i.checked));
        if (!hasTab) return null;

        return (
          <div key={k} style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color,
                letterSpacing: 1.2,
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              {TAB_LABELS[k]}
            </div>

            {data[k].map((sec, si) => {
              const checked = sec.items.filter((i) => i.checked);
              if (!checked.length) return null;

              return (
                <div key={si} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, color: '#666', marginBottom: 5 }}>{sec.subtitle}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {checked.map((item, ii) => (
                      <div
                        key={ii}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          background: '#272727',
                          borderRadius: 4,
                          padding: '3px 9px',
                        }}
                      >
                        <div style={{ width: 11, height: 11, background: color, borderRadius: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: '#ddd' }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <div style={{ borderBottom: '1px solid #2e2e2e', marginTop: 10 }} />
          </div>
        );
      })}
    </div>
  );
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface AppProps {
  open: boolean;
  setOpenProtocolGeneratorDialog: (openDialog: boolean) => void;
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function ProtocolGenerator({ open, setOpenProtocolGeneratorDialog }: AppProps): JSX.Element {
  const [tab, setTab] = useState<number>(0);
  const [data, setData] = useState<DataState>(buildState);
  const [result, setResult] = useState<ResultData | null>(null);
  const { generateNaturalProtocol } = useNutritionBuilder();
  const { patientId } = useParams();
  const [startDate, setStartDate] = useState<Dayjs>();
  const [totalDays, setTotalDays] = useState<number>(7);
  const [mealsByDay, setMealsByDay] = useState<number>(3);
  const { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk } = useMessageDialog();

  const tabKeys: TabKey[] = ['limpiar', 'equilibrar', 'suplementar', 'prevenir' /* "habitos" */];

  const allTabs: TabDef[] = [...tabKeys.map((k) => ({ key: k as AllTabKey, label: TAB_LABELS[k] })), { key: 'preview', label: 'VISTA FINAL' }];

  const toggle = (tk: TabKey, si: number, ii: number): void => {
    setData((prev) => ({
      ...prev,
      [tk]: prev[tk].map((s, sx) =>
        sx !== si
          ? s
          : {
              ...s,
              items: s.items.map((it, ix) => (ix !== ii ? it : { ...it, checked: !it.checked })),
            },
      ),
    }));
  };

  const addItem = (tk: TabKey, si: number, label: string): void => {
    setData((prev) => ({
      ...prev,
      [tk]: prev[tk].map((s, sx) => (sx !== si ? s : { ...s, items: [...s.items, { label, checked: true }] })),
    }));
  };

  const generar = async (): Promise<void> => {
    const out: ResultData = {};
    tabKeys.forEach((k) => {
      const sections = data[k]
        .map((s) => ({
          subtitle: s.subtitle,
          selected: s.items.filter((i) => i.checked).map((i) => i.label),
        }))
        .filter((s) => s.selected.length > 0);
      if (sections.length > 0) out[k] = sections;
    });
    setResult(out);

    generateNaturalProtocol({
      clean: out.limpiar?.flatMap((s) => s.selected) ?? [],
      equilibrate: out.equilibrar?.flatMap((s) => s.selected) ?? [],
      suplementate: out.suplementar?.flatMap((s) => s.selected) ?? [],
      // prevent: out.prevenir?.flatMap((s) => s.selected) ?? [],
      mealsByDay,
      totalDays,
      patient: patientId as string,
      startDate: startDate as Dayjs,
    });
    setMessage(MessagesForOkDialog.GENERATING_PATIENT_PLANS);
    setOpenProtocolGeneratorDialog(false);
  };

  /* const handleReset = (): void => {
    setData(buildState());
    setResult(null);
  }; */

  return (
    <Dialog
      open={open}
      onClose={() => setOpenProtocolGeneratorDialog(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: '#1e1e1e',
          color: '#e0e0e0',
          borderRadius: 2,
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          fontFamily: "'Segoe UI', sans-serif",
        },
      }}
    >
      {/* ── Title ── */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #2e2e2e',
          py: 1.5,
          px: 2.25,
          fontSize: 14,
          fontWeight: 600,
          color: '#e0e0e0',
        }}
      >
        Generator del plan nutritional
        <IconButton onClick={() => setOpenProtocolGeneratorDialog(false)} size="small" sx={{ color: '#666' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ── Tabs bar ── */}
      <Box
        sx={{
          background: '#181818',
          // borderBottom: "3px solid #e53935",
          display: 'flex',
          overflowX: 'auto',
        }}
      >
        {allTabs.map((t, i) => {
          const active = tab === i;
          const color = t.key === 'preview' ? '#ffd54f' : TAB_COLORS[t.key as TabKey] ?? '#fff';

          return (
            <button
              key={t.key}
              onClick={() => setTab(i)}
              style={{
                background: active ? '#2a2a2a' : 'transparent',
                border: 'none',
                borderRight: '1px solid #2a2a2a',
                color: active ? color : '#666',
                padding: '9px 15px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.7,
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'color 0.15s, background 0.15s',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </Box>

      {/* ── Body ── */}
      <DialogContent
        sx={{
          'p': '14px 16px',
          'overflowY': 'auto',
          'maxHeight': '52vh',
          'minHeight': 260,
          'background': '#1e1e1e',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: '#1e1e1e' },
          '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: 3 },
        }}
      >
        <GeneralPatientPlanDefinitionForNaturist
          mealsByDay={mealsByDay}
          totalDays={totalDays}
          datePickedHandler={(date) => setStartDate(date as Dayjs)}
          handleTotalDaysChange={(e: any) => {
            console.log('Total days changed:', e.target.value);
            setTotalDays(parseInt(e.target.value));
          }}
          handleMealsByDayChange={(e: any) => {
            console.log('Meals by day changed:', e.target.value);
            setMealsByDay(parseInt(e.target.value));
          }}
        />
        {tab < 5 && tabKeys[tab] ? (
          data[tabKeys[tab]].map((sec, si) => (
            <Section
              key={si}
              tabKey={tabKeys[tab]}
              section={sec}
              onToggle={(ii) => toggle(tabKeys[tab], si, ii)}
              onAdd={(label) => addItem(tabKeys[tab], si, label)}
            />
          ))
        ) : (
          <Preview data={data} />
        )}
      </DialogContent>

      {/* ── Result panel (collapses in) ── */}
      <Collapse in={!!result}>
        <Box
          sx={{
            borderTop: '1px solid #2e2e2e',
            p: '12px 16px',
            background: '#181818',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#00897b' }}>Array generado:</Typography>
            <IconButton onClick={() => setResult(null)} size="small" sx={{ color: '#666' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            component="pre"
            sx={{
              fontSize: 11,
              color: '#a0c4a0',
              background: '#1e1e1e',
              borderRadius: 1,
              p: '10px 12px',
              overflowX: 'auto',
              maxHeight: 200,
              m: 0,
            }}
          >
            {JSON.stringify(result, null, 2)}
          </Box>
        </Box>
      </Collapse>

      {/* ── Footer actions ── */}
      <DialogActions
        sx={{
          borderTop: '1px solid #2e2e2e',
          px: 2,
          py: 1.25,
          gap: 1,
        }}
      >
        {/* <Button
          onClick={handleReset}
          variant="outlined"
          size="small"
          sx={{
            'color': '#888',
            'borderColor': '#444',
            'textTransform': 'none',
            '&:hover': { borderColor: '#666', background: 'transparent' },
          }}
        >
          Limpiar
        </Button> */}
        <Button
          onClick={generar}
          variant="contained"
          size="small"
          sx={{
            'background': '#00897b',
            'color': '#fff',
            'textTransform': 'none',
            'fontWeight': 700,
            '&:hover': { background: '#00796b' },
          }}
        >
          Generar Plan
        </Button>
        {openDialog && (
          <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} setMessageOk={setMessageOk} />
        )}
      </DialogActions>
    </Dialog>
  );
}
