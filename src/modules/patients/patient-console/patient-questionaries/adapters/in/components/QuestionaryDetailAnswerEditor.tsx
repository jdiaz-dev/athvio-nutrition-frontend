import React, { useEffect, useRef, useState } from 'react';
import { Box, MenuItem, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import CheckAndCloseIcons from 'src/shared/components/Icons/CheckAndCloseIcons';
import { Option, OptionType } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary.d';

// The stored value is the option's uuid; the label shown to the user is its name.
// If you'd rather store the name, return option.name in getOptionValue.
const getOptionValue = (option: Option): string => option.uuid;
const getOptionLabel = (option: Option): string => option.name;

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')); // 00..23
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0')); // 00,05,...,55

const BOOLEAN_OPTIONS = [
  { value: 'true', label: 'Verdadero' },
  { value: 'false', label: 'Falso' },
];

const splitCsv = (value: string): string[] =>
  (value ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

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
  console.log('---options', options);
  const dispatch = useDispatch();
  const [editField, setEdtiField] = useState(false);
  const [newValue, setNewValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const cancerlEditFieldHandler = () => {
    setEdtiField(false);
  };
  const saveFieldHandler = () => {
    setEdtiField(false);
    dispatch(sliceUpdater({ uuid: questionaryDetail, [fieldKey]: newValue }));
  };

  useEffect(() => {
    if (editField && optionType === OptionType.TEXT) inputRef.current?.focus();
  }, [editField, optionType]);

  const selectableOptions = (options ?? []).map((o) => ({ value: getOptionValue(o), label: getOptionLabel(o) }));

  // ---------- Read-only display ----------
  const getDisplayValue = (): string => {
    if (!fieldValue) return '';
    switch (optionType) {
      case OptionType.BOOLEAN:
        return BOOLEAN_OPTIONS.find((o) => o.value === String(fieldValue).toLowerCase())?.label ?? fieldValue;
      case OptionType.SELECTOR:
        return selectableOptions.find((o) => o.value === fieldValue)?.label ?? fieldValue;
      case OptionType.MULTIPLE_SELECTOR:
        return splitCsv(fieldValue)
          .map((v) => selectableOptions.find((o) => o.value === v)?.label ?? v)
          .join(', ');
      default:
        return fieldValue;
    }
  };

  // ---------- Editors ----------
  const renderEditor = () => {
    switch (optionType) {
      case OptionType.MULTIPLE_SELECTOR: {
        const selected = splitCsv(newValue);
        return (
          <Select
            multiple
            displayEmpty
            variant="standard"
            style={{ width: '88%' }}
            value={selected}
            onChange={(e) => {
              const val = e.target.value;
              const arr = typeof val === 'string' ? splitCsv(val) : val;
              setNewValue(arr.join(','));
            }}
            renderValue={(sel) =>
              sel.length === 0 ? (
                <span style={{ opacity: 0.4, fontStyle: 'italic' }}>{placeHolder}</span>
              ) : (
                sel.map((v) => selectableOptions.find((o) => o.value === v)?.label ?? v).join(', ')
              )
            }
          >
            {selectableOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        );
      }

      case OptionType.SELECTOR: {
        const valid = selectableOptions.some((o) => o.value === newValue) ? newValue : '';
        return (
          <Select
            displayEmpty
            variant="standard"
            style={{ width: '88%' }}
            value={valid}
            onChange={(e) => setNewValue(e.target.value as string)}
            renderValue={(v) =>
              v ? (
                selectableOptions.find((o) => o.value === v)?.label ?? v
              ) : (
                <span style={{ opacity: 0.4, fontStyle: 'italic' }}>{placeHolder}</span>
              )
            }
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
        const normalized = String(newValue).toLowerCase();
        const valid = BOOLEAN_OPTIONS.some((o) => o.value === normalized) ? normalized : '';
        return (
          <Select
            displayEmpty
            variant="standard"
            style={{ width: '88%' }}
            value={valid}
            onChange={(e) => setNewValue(e.target.value as string)}
            renderValue={(v) =>
              v ? (
                BOOLEAN_OPTIONS.find((o) => o.value === v)?.label
              ) : (
                <span style={{ opacity: 0.4, fontStyle: 'italic' }}>{placeHolder}</span>
              )
            }
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
        const [h = '', m = ''] = (newValue ?? '').split(':');
        const hour = HOURS.includes(h) ? h : '';
        const minute = MINUTES.includes(m) ? m : '';
        // If only one of the two is chosen, the other defaults to "00" so the value is always HH:mm
        const update = (nextHour: string, nextMinute: string) => setNewValue(`${nextHour || '00'}:${nextMinute || '00'}`);
        return (
          <Box style={{ display: 'flex', alignItems: 'center', gap: 8, width: '88%' }}>
            <Select
              displayEmpty
              variant="standard"
              value={hour}
              onChange={(e) => update(e.target.value as string, minute)}
              renderValue={(v) => (v ? v : <span style={{ opacity: 0.4, fontStyle: 'italic' }}>HH</span>)}
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
              renderValue={(v) => (v ? v : <span style={{ opacity: 0.4, fontStyle: 'italic' }}>mm</span>)}
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
            style={{ width: '88%' }}
            multiline
            placeholder={placeHolder}
            value={newValue}
            variant="standard"
            inputRef={inputRef}
            onChange={(e) => setNewValue(e.target.value)}
          />
        );
    }
  };

  return (
    <Box width={'40%'}>
      <Box style={{ display: 'flex' }}>
        {renderEditor()}
        <CheckAndCloseIcons checkHandler={saveFieldHandler} closeHandler={cancerlEditFieldHandler} styles={{ marginLeft: '8%' }} />
      </Box>
    </Box>
  );
}

export default QuestionaryDetailAnswerEditor;
