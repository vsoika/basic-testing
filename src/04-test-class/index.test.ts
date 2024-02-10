// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import * as lodash from 'lodash';

jest.mock('lodash');

const mockInitialBalance = 100;
const account = getBankAccount(mockInitialBalance);
const anotherAccount = getBankAccount(mockInitialBalance);

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(mockInitialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(mockInitialBalance + 50)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      account.transfer(mockInitialBalance + 50, anotherAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(mockInitialBalance, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const depositValue = 125;
    const newBalance = account.getBalance() + depositValue;

    expect(account.deposit(depositValue).getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const amount = 30;
    const newBalance = account.getBalance() - amount;
    expect(account.withdraw(amount).getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const amount = 10;
    const newAccountBalance = account.getBalance() - amount;
    const newAnotherAccountBalance = anotherAccount.getBalance() + amount;

    account.transfer(amount, anotherAccount);
    expect(account.getBalance()).toBe(newAccountBalance);
    expect(anotherAccount.getBalance()).toBe(newAnotherAccountBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockReturnedBalance = 5;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(mockReturnedBalance)
      .mockReturnValue(1);

    await expect(account.fetchBalance()).resolves.toBe(mockReturnedBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockReturnedBalance = 5;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(mockReturnedBalance)
      .mockReturnValue(1);

    await expect(account.synchronizeBalance()).resolves;
    expect(account.getBalance()).toEqual(mockReturnedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockReturnedBalance = 5;
    const requestFailedValue = 0;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(mockReturnedBalance)
      .mockReturnValue(requestFailedValue);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
