// 定义设备信息的类型
export interface DeviceInfo {
  isAndroid: boolean;
  isIOS: boolean;
  isWeixin: boolean;
  isWeibo: boolean;
  isQQ: boolean;
  isMobile: boolean;
  isPC: boolean;
  isHarmony: boolean;
  isWeixinMiniProgram: boolean;
}

/**
 * 异步获取设备信息
 * @returns {Promise<DeviceInfo>} 设备信息对象
 */
export async function getDevice(): Promise<DeviceInfo> {
  const ua: string = navigator.userAgent.toLowerCase();

  // 检测是否在微信小程序内
  const isWeixinMiniProgram = await checkMiniProgram();

  return {
    // 终端类型检测
    isAndroid: /android|adr/i.test(ua),
    isIOS: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua),
    isHarmony: /openharmony|harmonyos/i.test(ua),

    // 社交应用环境检测
    isWeixin: /micromessenger/i.test(ua),
    isWeibo: /weibo/i.test(ua),
    isQQ: /qq\//i.test(ua), // 使用 'qq/' 更精确，避免误判

    // 设备类型检测
    isMobile: /applewebkit.*mobile.*/i.test(ua),
    isPC: !/applewebkit.*mobile.*/i.test(ua),

    // 小程序环境
    isWeixinMiniProgram,
  };
}

/**
 * 检查是否在微信小程序内
 * @returns {Promise<boolean>}
 */
export function checkMiniProgram(): Promise<boolean> {
  return new Promise((resolve) => {
    // 1. 如果 wx 对象存在且包含 getEnv 方法，则使用官方API
    if (typeof wx !== 'undefined' && wx.miniProgram && typeof wx.miniProgram.getEnv === 'function') {
      wx.miniProgram.getEnv((res: { miniprogram: boolean }) => {
        resolve(res.miniprogram === true);
      });
    } else {
      // 2. 降级方案：通过 User-Agent 判断
      const ua = navigator.userAgent.toLowerCase();
      resolve(/micromessenger/.test(ua) || /miniprogram/.test(ua));
    }
  });
}