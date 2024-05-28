import { ReactNode, useEffect, useState } from 'react';

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl';
import useConfig from 'src/modules/Lab/Lab3/hooks/useConfig';
import { I18n } from 'src/shared/types/config';

// project import

// load locales files
const loadLocaleData = (locale: I18n) => {
  switch (locale) {
    case 'fr':
      return import('src/modules/Lab/Lab3/utils/locales/fr.json');
    case 'ro':
      return import('src/modules/Lab/Lab3/utils/locales/ro.json');
    case 'zh':
      return import('src/modules/Lab/Lab3/utils/locales/zh.json');
    case 'en':
    default:
      return import('src/modules/Lab/Lab3/utils/locales/en.json');
  }
};

// ==============================|| LOCALIZATION ||============================== //

interface Props {
  children: ReactNode;
}

export default function Locales({ children }: Props) {
  const { i18n } = useConfig();

  const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

  useEffect(() => {
    loadLocaleData(i18n).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
      setMessages(d.default);
    });
  }, [i18n]);

  return (
    <>
      {messages && (
        <IntlProvider locale={i18n} defaultLocale="en" messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
}
