import i18n from 'i18next';

const supportedLanguages = ['en', 'es'] as const;
type SupportedLang = (typeof supportedLanguages)[number];

export const getShortLang = (): SupportedLang => {
  const rawLang = i18n.language || 'es';

  const normalizedLang = rawLang.includes('-') ? rawLang.split('-')[0] : rawLang;

  return supportedLanguages.includes(normalizedLang as SupportedLang) ? (normalizedLang as SupportedLang) : 'es';
};
