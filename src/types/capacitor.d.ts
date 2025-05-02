
interface Window {
  Capacitor?: {
    isNative: boolean;
    getPlatform: () => string;
    convertFileSrc?: (filePath: string) => string;
    platform?: string;
  };
  CapacitorHttp?: {
    request: (options: any) => Promise<any>;
  };
}
