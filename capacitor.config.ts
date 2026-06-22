import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.budget.tracker',
  appName: 'Bütçe Takibi',
  webDir: 'dist',
  backgroundColor: '#070810',
  server: { androidScheme: 'https' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      launchAutoHide: false,
      backgroundColor: '#06120f',
      showSpinner: false,
    },
    StatusBar: { overlaysWebView: false, backgroundColor: '#070810', style: 'DARK' },
    Keyboard: { resize: 'native' },
  },
};

export default config;
