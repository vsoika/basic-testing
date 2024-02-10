// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const expectedResult = 5;

    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Add,
      }),
    ).toEqual(expectedResult);
  });

  test('should subtract two numbers', () => {
    const expectedResult = 3;

    expect(
      simpleCalculator({
        a: 5,
        b: 2,
        action: Action.Subtract,
      }),
    ).toEqual(expectedResult);
  });

  test('should multiply two numbers', () => {
    const expectedResult = 8;

    expect(
      simpleCalculator({
        a: 4,
        b: 2,
        action: Action.Multiply,
      }),
    ).toEqual(expectedResult);
  });

  test('should divide two numbers', () => {
    const expectedResult = 2;

    expect(
      simpleCalculator({
        a: 4,
        b: 2,
        action: Action.Divide,
      }),
    ).toEqual(expectedResult);
  });

  test('should exponentiate two numbers', () => {
    const expectedResult = 9;

    expect(
      simpleCalculator({
        a: 3,
        b: 2,
        action: Action.Exponentiate,
      }),
    ).toEqual(expectedResult);
  });

  test('should return null for invalid action', () => {
    const expectedResult = null;

    expect(
      simpleCalculator({
        a: 4,
        b: 2,
        action: 'InvalidAction',
      }),
    ).toEqual(expectedResult);
  });

  test('should return null for invalid arguments', () => {
    const expectedResult = null;

    expect(
      simpleCalculator({
        a: '4',
        b: '2',
        action: Action.Divide,
      }),
    ).toEqual(expectedResult);
  });
});
