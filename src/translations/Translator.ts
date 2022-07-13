import { supportHyperlink } from '../utils/Helpers';
import * as i18next from 'i18next';
import { CACHE_PATH, ENCODING_FORMAT } from '../Constants';
import * as FS from 'fs';

class Translator {
  async init() {
    let cacheObject;
    if (FS.existsSync(CACHE_PATH)) {
      const cacheFile = FS.readFileSync(CACHE_PATH, ENCODING_FORMAT);
      try {
        cacheObject = JSON.parse(cacheFile);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    await i18next.init({
      lng: 'en',
      fallbackLng: ['en', 'fr'],
      supportedLngs: ['en', 'fr'],
      resources: {
        en: {
          translation: require('./locales/en.json'),
        },
        fr: {
          translation: require('./locales/fr.json'),
        },
      },
    });

    if (cacheObject && cacheObject.language) {
      await i18next.changeLanguage(cacheObject.language);
    }
  }

  translate(key: string, parameters?: any) {
    const params: any = {
      ...parameters,
    };

    return supportHyperlink(i18next.t(key, params));
  }
}

export default new Translator();
