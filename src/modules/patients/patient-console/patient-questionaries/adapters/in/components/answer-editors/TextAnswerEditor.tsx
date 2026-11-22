import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

const DEBOUNCE_MS = 600;

function TextAnswerEditor({ value, placeHolder, onChange }: { value: string; placeHolder: string; onChange: (value: string) => void }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (text === value) return undefined;
    // Debounced commit: runs DEBOUNCE_MS after the last keystroke
    const id = setTimeout(() => onChange(text), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [text]);

  return (
    <TextField
      fullWidth
      multiline
      placeholder={placeHolder}
      value={text}
      variant="standard"
      onChange={(e) => setText(e.target.value)}
      onBlur={() => {
        if (text !== value) onChange(text);
      }}
    />
  );
}

export default TextAnswerEditor;
