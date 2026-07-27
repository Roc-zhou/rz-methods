interface WechatMiniprogram {
  miniProgram: {
    getEnv: (callback: (res: { miniprogram: boolean }) => void) => void;
    navigateTo: (options: { url: string }) => void;
    navigateBack: (options?: { delta?: number }) => void;
    postMessage: (options: { data: any }) => void;
  };
}

declare const wx: WechatMiniprogram;