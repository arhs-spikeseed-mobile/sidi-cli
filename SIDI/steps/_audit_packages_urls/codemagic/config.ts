import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'SSL_LABS_SCAN', globalValue: true, defaultValue: 'no' },
    {
      key: 'BLACK_LIST',
      globalValue: true,
      defaultValue:
        'apache.org;cloudflare.com;bintray.com;w3.org;apple-mapkit.com;apple.com;mzstatic.com;mozilla.org;github.io;github.com;youtube.com;withgoogle.com;android.com;google.com;jitpack.io;microsoft.com;firebaseio.com',
    },
    { key: 'FAIL_ON_CVSS_LEVEL', globalValue: true },
  ],
};

export default config;
