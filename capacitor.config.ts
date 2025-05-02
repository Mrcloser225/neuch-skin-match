
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b01b32cd1b124164b319d9d5a4ca6546',
  appName: 'neuch-skin-match',
  webDir: 'dist',
  server: {
    url: 'https://github.com/Mrcloser225/neuch-skin-match.git',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
    backgroundColor: "#FFF8F2",
    preferredContentMode: 'mobile',
    scheme: 'neuch-skin-match'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFF8F2",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
