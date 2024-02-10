// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import * as mockPath from 'path';
import * as mockFsPromises from 'fs/promises';
import * as mockFs from 'fs';

jest.mock('path');
jest.mock('fs/promises');
jest.mock('fs');

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const mockTimeout = 1;

    doStuffByTimeout(mockCallback, mockTimeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    const mockTimeout = 1;

    doStuffByTimeout(mockCallback, mockTimeout);

    expect(mockCallback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const mockTimeout = 3000;

    doStuffByInterval(mockCallback, mockTimeout);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    const mockTimeout = 1000;

    doStuffByInterval(mockCallback, mockTimeout);

    jest.advanceTimersByTime(3000);
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const path = '/src';
    const pathSpy = jest.spyOn(mockPath, 'join');

    await readFileAsynchronously(path);

    expect(pathSpy).toHaveBeenCalledWith(expect.any(String), path);
  });

  test('should return null if file does not exist', async () => {
    const path = '/src';
    jest.spyOn(mockPath, 'join');
    jest.spyOn(mockFs, 'existsSync').mockReturnValue(false);

    await expect(readFileAsynchronously(path)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const path = '/src';
    const fileContent = 'test';
    jest.spyOn(mockPath, 'join');
    jest.spyOn(mockFsPromises, 'readFile').mockResolvedValue(fileContent);
    jest.spyOn(mockFs, 'existsSync').mockReturnValue(true);

    await expect(readFileAsynchronously(path)).resolves.toEqual(fileContent);
  });
});
