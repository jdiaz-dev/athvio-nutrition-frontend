import React, { useEffect, useState } from 'react';
import { Box, Checkbox, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Option, OptionType } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary.d';

const getOptionValue = (option: Option): string => option.name;
const getOptionLabel = (option: Option): string => option.name;

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

const BOOLEAN_OPTIONS = [
  { value: 'true', label: 'Verdadero' },
  { value: 'false', label: 'Falso' },
];

const splitCsv = (value: string): string[] =>
  (value ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

const placeholderSpan = (text: string) => <span style={{ opacity: 0.4, fontStyle: 'italic' }}>{text}</span>;

function QuestionaryDetailAnswerEditor({
  questionaryDetail,
  fieldKey,
  fieldValue,
  placeHolder,
  sliceUpdater,
  optionType,
  options,
}: {
  questionaryDetail: string;
  fieldKey: string;
  fieldValue: string;
  placeHolder: string;
  sliceUpdater: ActionCreatorWithPayload<any>;
  optionType: OptionType;
  options?: Option[] | undefined;
}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(fieldValue ?? '');

  useEffect(() => {
    setValue(fieldValue ?? '');
  }, [fieldValue]);

  const save = (newValue: string) => {
    dispatch(sliceUpdater({ uuid: questionaryDetail, [fieldKey]: newValue }));
  };

  const commit = (newValue: string) => {
    setValue(newValue);
    save(newValue);
  };

  useEffect(() => {
    // Debounced commit: runs DEBOUNCE_MS after the last keystroke
    const DEBOUNCE_MS = 600;
    const id = setTimeout(() => save(value), DEBOUNCE_MS);
    return () => clearTimeout(id); // restarts the timer on every change
  }, [value]);

  const selectableOptions = (options ?? []).map((o) => ({ value: getOptionValue(o), label: getOptionLabel(o) }));

  const renderEditor = () => {
    switch (optionType) {
      case OptionType.MULTIPLE_SELECTOR: {
        const selected = splitCsv(value);
        return (
          <Select
            multiple
            displayEmpty
            variant="standard"
            fullWidth
            value={selected}
            onChange={(e) => {
              const val = e.target.value;
              const arr = typeof val === 'string' ? splitCsv(val) : val;
              commit(arr.join(','));
            }}
            renderValue={(sel) => (sel.length === 0 ? placeholderSpan(placeHolder) : sel.join(', '))}
          >
            {selectableOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                <Checkbox checked={selected.includes(o.value)} size="small" />
                <ListItemText primary={o.label} />
              </MenuItem>
            ))}
          </Select>
        );
      }

      case OptionType.SELECTOR: {
        const valid = selectableOptions.some((o) => o.value === value) ? value : '';
        return (
          <Select
            displayEmpty
            variant="standard"
            fullWidth
            value={valid}
            onChange={(e) => commit(e.target.value as string)}
            renderValue={(v) => (v ? v : placeholderSpan(placeHolder))}
          >
            {selectableOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        );
      }

      case OptionType.BOOLEAN: {
        const normalized = String(value).toLowerCase();
        const valid = BOOLEAN_OPTIONS.some((o) => o.value === normalized) ? normalized : '';
        return (
          <Select
            displayEmpty
            variant="standard"
            fullWidth
            value={valid}
            onChange={(e) => commit(e.target.value as string)}
            renderValue={(v) => (v ? BOOLEAN_OPTIONS.find((o) => o.value === v)?.label : placeholderSpan(placeHolder))}
          >
            {BOOLEAN_OPTIONS.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        );
      }

      case OptionType.HOUR: {
        const [h = '', m = ''] = (value ?? '').split(':');
        const hour = HOURS.includes(h) ? h : '';
        const minute = MINUTES.includes(m) ? m : '';
        const update = (nextHour: string, nextMinute: string) => commit(`${nextHour || '00'}:${nextMinute || '00'}`);
        return (
          <Box style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Select
              displayEmpty
              variant="standard"
              value={hour}
              onChange={(e) => update(e.target.value as string, minute)}
              renderValue={(v) => (v ? v : placeholderSpan('HH'))}
              MenuProps={{ PaperProps: { style: { maxHeight: 240 } } }}
              style={{ minWidth: 60 }}
            >
              {HOURS.map((hh) => (
                <MenuItem key={hh} value={hh}>
                  {hh}
                </MenuItem>
              ))}
            </Select>
            <span>:</span>
            <Select
              displayEmpty
              variant="standard"
              value={minute}
              onChange={(e) => update(hour, e.target.value as string)}
              renderValue={(v) => (v ? v : placeholderSpan('mm'))}
              MenuProps={{ PaperProps: { style: { maxHeight: 240 } } }}
              style={{ minWidth: 60 }}
            >
              {MINUTES.map((mm) => (
                <MenuItem key={mm} value={mm}>
                  {mm}
                </MenuItem>
              ))}
            </Select>
          </Box>
        );
      }

      case OptionType.TEXT:
      default:
        return (
          <TextField
            fullWidth
            multiline
            placeholder={placeHolder}
            value={value}
            variant="standard"
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              if (value !== (fieldValue ?? '')) save(value);
            }}
          />
        );
    }
  };

  return <Box width={'40%'}>{renderEditor()}</Box>;
}

export default QuestionaryDetailAnswerEditor;
