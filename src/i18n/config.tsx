import { arSA, enUS, frFR, zhCN } from '@mui/material/locale';

import { toAbsoluteUrl } from '@/utils';

import arMessages from './messages/ar.json';
import enMessages from './messages/en.json';
import { type LanguageType } from './types';

const I18N_MESSAGES = {
  en: enMessages,
  ar: arMessages,
};

const I18N_CONFIG_KEY = 'i18nConfig';

const I18N_LANGUAGES: readonly LanguageType[] = [
  {
    label: 'English',
    code: 'en',
    systemValue: enUS,
    direction: 'ltr',
    flag: toAbsoluteUrl('/media/flags/united-states.svg'),
    messages: I18N_MESSAGES.en
  },
  {
    label: 'Arabic (Saudi)',
    code: 'ar',
    systemValue: arSA,
    direction: 'rtl',
    flag: toAbsoluteUrl('/media/flags/saudi-arabia.svg'),
    messages: I18N_MESSAGES.ar
  }
];

const I18N_DEFAULT_LANGUAGE: LanguageType = I18N_LANGUAGES[0];

export { I18N_CONFIG_KEY, I18N_DEFAULT_LANGUAGE, I18N_LANGUAGES, I18N_MESSAGES };
