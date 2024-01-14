import React from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

function CustomPasteIcon({ handler }: { handler: () => void }) {
  return <ContentPasteIcon onClick={handler} />;
}

export default CustomPasteIcon;
