import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import vi from 'i18n/vi';
import en from 'i18n/en';

const resources = {
  vi,
  en,
};
i18next.use(initReactI18next).init({
  resources,
  lng: 'vi',
  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});
export default i18next;
