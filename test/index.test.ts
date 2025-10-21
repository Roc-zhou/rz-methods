import { isEmpty, deepClone, debounce, formatDate, numberToChinese, preciseAdd, timeAgo, compareVersion } from '../src';

describe('isEmpty', () => {
  test('should return true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('  ')).toBe(true);
  });

  test('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  test('should return false for non-empty values', () => {
    expect(isEmpty('test')).toBe(false);
    expect(isEmpty([1, 2])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(123)).toBe(false);
  });
});

describe('deepClone', () => {
  test('should clone primitive values', () => {
    expect(deepClone(123)).toBe(123);
    expect(deepClone('test')).toBe('test');
    expect(deepClone(true)).toBe(true);
  });

  test('should clone Date objects', () => {
    const date = new Date();
    const cloned = deepClone(date);
    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
  });

  test('should clone arrays', () => {
    const arr = [1, { a: 2 }, [3]];
    const cloned = deepClone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).not.toBe(arr[1]);
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  test('should delay function execution', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    // 调用防抖函数
    debouncedFn();
    expect(mockFn).not.toBeCalled();

    // 快进时间
    jest.advanceTimersByTime(500);
    expect(mockFn).not.toBeCalled();

    // 再次调用会重置定时器
    debouncedFn();
    jest.advanceTimersByTime(500);
    expect(mockFn).not.toBeCalled();

    // 完整等待延迟时间
    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('should clone objects', () => {
    const obj = {
      a: 1,
      b: { c: 2 },
      d: [3, 4]
    };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
    expect(cloned.d).not.toBe(obj.d);
  });


});

describe('formatDate', () => {
  // test('should format date correctly', () => {
  //   expect(formatDate(1760683986000)).toBe('2025-10-17 14:53:06');
  // });
  test('should format date correctly', () => {
    expect(formatDate(1760683986000, 'YYYY-MM-DD')).toBe('2025-10-17');
  });
})

describe('numberToChinese', () => {
  test('should convert number to Chinese correctly', () => {
    expect(numberToChinese(1001)).toBe('一零零一');
    expect(numberToChinese(0)).toBe('零');
    expect(numberToChinese(20189)).toBe('二零一八九');
  });
})

// 加法
describe('preciseAdd', () => {
  test('should add two numbers precisely', () => {
    expect(preciseAdd(0.1, 0.2)).toBe(0.3);
    expect(preciseAdd(1.005, 0.005)).toBe(1.01);
    expect(preciseAdd(123456789.123456, 0.876544)).toBe(123456790);
  });
});

// 时间格式化
describe('timeAgo', () => {
  test('should return correct time ago string', () => {
    const now = Date.now();

    expect(timeAgo(now - 60 * 1000)).toBe('1分钟前');
    expect(timeAgo(now - 90 * 1000)).toBe('1分钟前');
    expect(timeAgo(now - 120 * 1000)).toBe('2分钟前');
    expect(timeAgo(now - 3600 * 1000)).toBe('1小时前');
  });
});

// 版本比较
describe('compareVersion', () => {
  test('should compare versions correctly', () => {
    expect(compareVersion('1.0.0', '1.0.0')).toBe(0);
    expect(compareVersion('1.0.0', '1.0.1')).toBe(-1);
    expect(compareVersion('1.0.1', '1.0.0')).toBe(1);
  })
})