export {};

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => Promise<any>;
      destroy: () => void;
      addScene: (opts: any) => void;
    };
  }
}