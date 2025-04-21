import React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';

function AssigmentStartDate({ datePickedHandler }: { datePickedHandler: (newDate: Dayjs | null) => void }) {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: '15px' }}>
      <text style={{ fontWeight: 'bold' }}>{t('programsModule.titles.assigmentStartDay')}</text>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker onChange={datePickedHandler} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}

export default AssigmentStartDate;
