// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

const mockResponse = {
  data: 'data',
};

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn(() => Promise.resolve(mockResponse));

    const mockAxiosCreate = jest
      .spyOn(axios, 'create')
      .mockImplementation(() => {
        return {
          get: mockGet,
        } as unknown as AxiosInstance;
      });

    const relativePath = '/src';
    await throttledGetDataFromApi(relativePath);

    expect(mockAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn(() => Promise.resolve(mockResponse));

    jest.spyOn(axios, 'create').mockImplementation(() => {
      return {
        get: mockGet,
      } as unknown as AxiosInstance;
    });
    const relativePath = '/src';
    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockGet = jest.fn(() => Promise.resolve(mockResponse));

    jest.spyOn(axios, 'create').mockImplementation(() => {
      return {
        get: mockGet,
      } as unknown as AxiosInstance;
    });
    const relativePath = '/src';
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockResponse.data);
  });
});
