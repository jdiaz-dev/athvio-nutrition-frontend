import React from 'react';
import { Checkbox, ListItemText, MenuItem, Select } from '@mui/material';
import {
  FocusedQuestionAnswer,
  MultipleSelectorAnswerItem,
  Option,
} from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary.d';
import {
  placeholderSpan,
  splitCsv,
} from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/answerEditorHelpers';
import FocusedQuestionsEditor from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/FocusedQuestionsEditor';

function MultipleSelectorAnswerEditor({
  items,
  options,
  placeHolder,
  onChange,
}: {
  items: MultipleSelectorAnswerItem[];
  options: Option[];
  placeHolder: string;
  onChange: (items: MultipleSelectorAnswerItem[]) => void;
}) {
  const selected = items.map((item) => item.name);

  const selectionHandler = (names: string[]) =>
    onChange(names.map((name) => items.find((item) => item.name === name) ?? { name, focusedQuestions: [] }));

  const focusedAnswersHandler = (name: string, focusedQuestions: FocusedQuestionAnswer[]) =>
    onChange(items.map((item) => (item.name === name ? { ...item, focusedQuestions } : item)));

  return (
    <>
      <Select
        multiple
        displayEmpty
        variant="standard"
        fullWidth
        value={selected}
        onChange={(e) => {
          const val = e.target.value;
          selectionHandler(typeof val === 'string' ? splitCsv(val) : val);
        }}
        renderValue={(sel) => (sel.length === 0 ? placeholderSpan(placeHolder) : sel.join(', '))}
      >
        {options.map((o) => (
          <MenuItem key={o.uuid} value={o.name}>
            <Checkbox checked={selected.includes(o.name)} size="small" />
            <ListItemText primary={o.name} />
          </MenuItem>
        ))}
      </Select>
      {items.map((item) => {
        const enabledFocusedQuestions = (options.find((o) => o.name === item.name)?.focusedQuestions ?? []).filter((fq) => fq.isEnabled);
        if (enabledFocusedQuestions.length === 0) return null;
        return (
          <FocusedQuestionsEditor
            key={item.name}
            optionName={item.name}
            focusedQuestions={enabledFocusedQuestions}
            focusedAnswers={item.focusedQuestions}
            onChange={(focusedAnswers) => focusedAnswersHandler(item.name, focusedAnswers)}
          />
        );
      })}
    </>
  );
}

export default MultipleSelectorAnswerEditor;
