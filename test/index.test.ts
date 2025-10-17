import { isEmpty, deepClone, debounce } from '../src';

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