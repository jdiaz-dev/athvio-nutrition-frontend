import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTranslation } from 'react-i18next';

export default function SelectedPatients() {
  const { t } = useTranslation();
  const assignProgramState = useSelector((state: ReduxStates) => state.assignProgram);
  const patients = assignProgramState.patients.map((patient) => `${patient.firstname} ${patient.lastname}`);
  return (
    <>
      {/* todo: group common styles with fontweight */}
      <div style={{ fontWeight: 'bold' }}>{t('programsModule.titles.selectedPatients')}</div>
      <TextareaAutosize style={{ cursor: 'not-allowed', width: '100%' }} disabled placeholder="No patient selected" value={patients} />
    </>
  );
}
