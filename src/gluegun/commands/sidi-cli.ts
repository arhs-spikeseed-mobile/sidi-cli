import { GluegunCommand } from 'gluegun';
import { checkNewVersion } from '../../utils/Version';

const command: GluegunCommand = {
  name: 'sidi-cli',
  run: async (toolbox) => {
    // print.info(
    //   '█────▓▒█▓▒▒██░▒▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓────────\n█────▓▒▓▓▓▒█▓▒▓▓▒▒▓▓▒▓▒▓▓▒▓▓▓▓▓▒────────\n█────▒▓▓▓▒░█▓▒▓▓▓▒▓▓▓▒▒█▓▒▓▓▓▓▓─────────\n█────▒▓▓▓░▒█▓▓▓▓▓▒█▓▒▓▒█▓▓▓▓▓▓▓─────────\n█─────▓▓▓─░█▓▒▓▓▒▓█▒▓▓▓▓▓▒▓▓▓▓──────────\n█─────▓▓▒─░▓▓▒▓▓▒▓█▒▒▓▓▓▓▓▓▓▓░──────────\n█─────▓▓▒──▓▓▒▓▒▒▓▓▒▓▓▓▓▓▓▓▓▒───────────\n█─────▒▓───▓▓▓▓▓▒█▓▒▓▓▓▓▒▓▓▓────█───────\n█──────█───▓▓▒▓▓▒██▒▓▓▓▓▓▓▓▒───██───▓───\n█──────▓───▓█▓▓▓▒█▓▒▓▓▓▓▓▓▓────█░──▒▓░──\n█──────░───░█▓▓▒▒█▓▒▓▓▓▓▓▓▒───██───▓▓▒──\n█───────────█▓▓▓▒█▓▒▓▓▒▓▓▓────█▓──▓▓▓░──\n█───────────█▓▓▒▓█▓▒▓▓▓▓▓▓──▓▓█▒─▒▓▓▓▒──\n█▒────▒─────▓▓▒▒▓█▓▒▓▓▓▓▓──▓▒██──▓▓▓▓▒──\n█─────▓─────░█▒▓▓█▓▒▓▓▓▓▓──▒▓█▓─▓▓▓▓▓▒──\n█──▓──▓▒─────█▓▒▓██▒▓▓▓▓▒─▓███▓▒▓▓▓▓▓▒──\n█▓─█──▒▓────▒▓█▓▒██▒▓▓▓▓──█▓▓███▓▒▓▓▓▒──\n▓█─█──░▓░─▒█▓──█▓██▒▒▓▓▓─█─────▓█▓▒▓▓░──\n▒█─▓───▓▒██─────███▒▓▓▓░██──────▒█▓▓▓░──\n▒█░░▒──▒█▓──────▓██▓▒▓▒▓█────────██▒▓░──\n▒▓█─█──▓█────────██▓▒▒░█▒─────────█▒▓───\n▒▓█─█──█──────────█▓▒▓▓█──────────█▓▓──▓\n─▓█▓▓──█──────────██─▒█▓──────────▓█▒──█\n─▒▓▓▒░▓▒───────────█▒▒█──────────▓▓█▒──█\n──▓▒─▒█────────────██▓█──────────█─█▓─▓─\n───▓─▓▓░▓──────────░██░──────────█░▓░───\n▓──▒─█─▓█───────────██───────────█▓▒▓───\n█────▓─█▓────────────────────────██▒█───\n█▓───█─█▓────────────────────────██─█──█\n─█───█▒█▒────────────▒───────────▓█─█──█\n─█░──▓▓█▒────────────▓────────────█─▒─██\n▓██──▓▓█─────────────▒────────────█─░─██\n█─█▓─▓██─────────────▓───██───────▓▓▓─█▒\n▒──█▒─██────────▒█───█──▒█▓────────▓█▓▓█\n▒▓█─█─█──────────██──█──██──────▓█▓─██▓▒\n▓███─██─██▓▒─────▒██─▓─▓█▒────▒█─██─█▓█░\n▓▓─▓▒█▓─█▓─▓█▒────██─▓░██────▒█──██─█▓──\n▒──█▒█▓─█▓───█▓────█▓▓▓█▓───▒█───██░█▓█─\n▓───▒▒█─██▓───▓▓───▓▓───────█──███─▓█─█▒\n█───█▒█▒──██░───█───▓─────▒▓──▓██──████─\n██─▓██▓▓───█░▒█─▒█──██▒▓▓██─▓▓██───███──\n▓█──████───██──█▒─▒▓██▒███▓▓─▓██──░█▓──█\n▒█▓─▒███▓───█────▓░██▓▓██▓█──██───█▓──▓█\n▓▓█░───██────█▓──██▒▓███▓▓──▓▓░█▓─█──▓█▓\n▓▓▓█▓───█▓──███▓▓██▓▒▓▓▒─▓▓▓█▓██▒─██████\n▓▓▓▓██░─▒█──▓▓███▓██▓───▓███▓░────█████▓\n▓▓▓▓██████▓───────▓█─██──▓░──────█████▒▒\n▓▓▓▒▓██████──────────█▓──────────███▓▒▒▓\n▓▓▓▓▓▒▓████─────────▓█░─▒────▒───██▒▒▓▓▓\n▓▓▓▓▓▓▓▒▓▓██───▒─────█▓▓▓────█░─█▓█▒▓▓▓▓\n▓▓▓▓▓▓▓▓▓▒▒█░──█▓────▒██▓▓──▓█─█▓─█▒▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓██░─░█───▒▓─▒─▒──▓▒▓█──█▒▓▓▓▓\n▓▓▓▓▓▓▓▓▓▒█▓─█▓─▒░──░──░▓▒───▒█──██▒▓▓▓▓\n▓▓▓▓▓▓▓▓▓▒██──██─────▒████───█──███▒▒▓▓▓\n▓▓▓▓▓▓▓▓▓▒██───██────░▒─────█▓▓████▒▒▓▓▓\n▓▓▓▓▓▓▓▓▓▓█▓────███────────█████████▓▓▓▓\n▓▓▓▓▓▓▓▓▒▓██▓───▓███▒────▒███████████▓▒▓\n▓▓▓▓▓▓▓▓▒█████████████████████████████▓▓\n▓▓▓▓▓▓▓▓▒██████████████████████████████▓\n▓▓▓▓▓▓▓▓▒████████████████████████▓────▓▓\n▓▓▓▓▓▓▓▒▒████████████████████▒────▒───▒▒\n▓▓▓▓▓▓▓▒███████████████████▓░────▓██████\n▓▓▓▒▓▒▓███████████████████▓█▒─▓█████████\n▒▓▓▓▓███████▓███████████████─▓██████████\n▓██▒▓██████████████████████▒████████████\n'
    // );

    await checkNewVersion(toolbox);
  },
};

module.exports = command;
