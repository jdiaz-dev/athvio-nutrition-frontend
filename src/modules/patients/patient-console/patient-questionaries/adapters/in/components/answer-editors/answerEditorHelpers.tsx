import React from 'react';
import {
  FocusedQuestionAnswer,
  MultipleSelectorAnswerItem,
  PrimitiveAnswer,
  QuestionaryAnswer,
} from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary.d';

export const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
export const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

export const BOOLEAN_OPTIONS = [
  { value: 'true', label: 'Verdadero' },
  { value: 'false', label: 'Falso' },
];

export const placeholderSpan = (text: string) => <span style={{ opacity: 0.4, fontStyle: 'italic' }}>{text}</span>;

export const splitCsv = (value: string): string[] =>
  (value ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

export const toPrimitiveAnswer = (answer: QuestionaryAnswer | null | undefined): PrimitiveAnswer | undefined =>
  typeof answer === 'string' || typeof answer === 'number' || typeof answer === 'boolean' ? answer : undefined;

export const toStringAnswer = (answer: PrimitiveAnswer | undefined): string => (answer === undefined ? '' : String(answer));

export const toMultipleSelectorItems = (answer: QuestionaryAnswer | null | undefined): MultipleSelectorAnswerItem[] => {
  if (Array.isArray(answer)) return answer;
  if (typeof answer === 'string') return splitCsv(answer).map((name) => ({ name }));
  return [];
};

export const upsertFocusedQuestionAnswer = (
  focusedAnswers: FocusedQuestionAnswer[] | undefined,
  associatedQuestion: string,
  answer: PrimitiveAnswer,
): FocusedQuestionAnswer[] => {
  const current = focusedAnswers ?? [];
  const exists = current.some((item) => item.associatedQuestion === associatedQuestion);
  return exists
    ? current.map((item) => (item.associatedQuestion === associatedQuestion ? { ...item, answer } : item))
    : [...current, { associatedQuestion, answer }];
};
