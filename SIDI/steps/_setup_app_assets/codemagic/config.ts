import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'IMAGE_OVERLAYER_SOURCE_IMAGE', globalValue: true },
    { key: 'IMAGE_OVERLAYER_LEFT_ICON' },
    { key: 'IMAGE_OVERLAYER_TEXT_COLOR' },
    { key: 'IMAGE_OVERLAYER_RIGHT_ICON' },
    { key: 'IMAGE_OVERLAYER_CENTER_IMAGE' },
    { key: 'IMAGE_OVERLAYER_EXPORT_RESULT' },
    { key: 'IMAGE_OVERLAYER_ARCHIVE_RESULT' },
    { key: 'IMAGE_OVERLAYER_PATH_GENERATOR', globalValue: true },
  ],
};

export default config;
