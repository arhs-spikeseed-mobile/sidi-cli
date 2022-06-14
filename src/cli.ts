import { build } from 'gluegun';
import Translator from './translations/Translator';

/**
 * Create the cli and kick it off
 */
async function run(argv: string) {
  await Translator.init();
  // create a CLI runtime
  return await build()
    .brand('sidi-cli')
    .src(`${__dirname}/gluegun`)
    .plugins('./node_modules', { matching: 'sidi-cli-*', hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .exclude(['strings', 'semver', 'system', 'http', 'template', 'patching', 'package-manager'])
    .create()
    .run(argv);
}

module.exports = { run };
