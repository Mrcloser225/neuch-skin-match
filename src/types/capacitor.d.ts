
interface Window {
  Capacitor?: {
    isNative: boolean;
    getPlatform: () => string;
    convertFileSrc?: (filePath: string) => string;
    platform?: string;
    isPluginAvailable?: (pluginName: string) => boolean;
    registerPlugin?: (pluginName: string, plugin: any) => any;
  };
  CapacitorHttp?: {
    request: (options: any) => Promise<any>;
  };
  // Add other Capacitor plugin globals here as needed
  CapacitorCamera?: {
    getPhoto: (options: any) => Promise<any>;
  };
}
