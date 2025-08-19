import { useEffect, useState } from 'react';

const SPANISH_SPEAKING_COUNTRIES = [
  'AR',
  'BO',
  'CL',
  'CO',
  'CR',
  'CU',
  'DO',
  'EC',
  'SV',
  'GQ',
  'GT',
  'HN',
  'MX',
  'NI',
  'PA',
  'PY',
  'PE',
  'PR',
  'ES',
  'UY',
  'VE',
];

function isSpanishSpeakingCountry(code: string): boolean {
  return SPANISH_SPEAKING_COUNTRIES.includes(code.toUpperCase());
}
export function useDetectedLanguage() {
  const [detectedLanguage, setDetectedLanguage] = useState<'en' | 'es'>('es');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        const countryCode = data.country_code;
        if (isSpanishSpeakingCountry(countryCode)) {
          setDetectedLanguage('es');
        } else {
          setDetectedLanguage('en');
        }
      })
      .catch((err) => console.error('GeoIP error:', err));
  }, []);
  return { detectedLanguage };
}
