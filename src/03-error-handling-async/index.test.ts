// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  // MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const mockValue = 'test';
    await expect(resolveValue(mockValue)).resolves.toBe(mockValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const mockMsg = 'error';
    expect(() => throwError(mockMsg)).toThrow(mockMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
