import { GluegunToolbox } from 'gluegun';
import Translator from '../../translations/Translator';
import { print } from '../../utils/Printer';
import * as i18next from 'i18next';
import { CACHE_PATH, ENCODING_FORMAT } from '../../Constants';
import * as FS from 'fs';

module.exports = {
  name: 'language',
  alias: ['l'],
  description: Translator.translate('commandDescription.language'),
  run: async (toolbox: GluegunToolbox) => {
    const { selectExtension } = toolbox;
    // @ts-ignore
    print(toolbox, Translator.translate('language.availables', { availableLanguages: i18next.languages }));
    // @ts-ignore
    print(toolbox, Translator.translate('language.current', { currentLanguage: i18next.language }));

    if (await toolbox.prompt.confirm(Translator.translate('language.change'))) {
      // @ts-ignore
      const selectedLanguage = await selectExtension(Translator.translate('language.select'), i18next.languages);
      await i18next.changeLanguage(selectedLanguage);

      FS.writeFileSync(CACHE_PATH, JSON.stringify({ language: selectedLanguage }), ENCODING_FORMAT);
      print(toolbox, Translator.translate('language.updated'));
    }
  },
};
