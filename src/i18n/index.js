import { createI18n } from 'vue-i18n';

import header from './header';
import org from './org';
import corp from './corp';
import tips from './tips';
import signPage from './signPage';
import signType from './signType';
import index from './ind';

const messages = {
  zh: {
    header: header.zh,
    org: org.zh,
    corp: corp.zh,
    tips: tips.zh,
    signPage: signPage.zh,
    signType: signType.zh,
    index: index.zh,
  },
  en: {
    header: header.en,
    org: org.en,
    corp: corp.en,
    tips: tips.en,
    signPage: signPage.en,
    signType: signType.en,
    index: index.en,
  },
};

const i18n = createI18n({
  globalInjection: true,
  locale: 'zh',
  legacy: false,
  messages,
});

export default i18n;
