// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 0, b: 2, action: Action.Multiply, expected: 0 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

describe('simpleCalculator', () => {
  test.each<{
    a: number;
    b: number;
    action: Action;
    expected: number;
  }>(testCases.filter((test) => test.action === Action.Add))(
    'should return $expected when adding $a to $b',
    ({ expected, ...rawInput }) => {
      expect(simpleCalculator(rawInput)).toEqual(expected);
    },
  );

  test.each<{
    a: number;
    b: number;
    action: Action;
    expected: number;
  }>(testCases.filter((test) => test.action === Action.Subtract))(
    'should return $expected when subtract $a from $b',
    ({ expected, ...rawInput }) => {
      expect(simpleCalculator(rawInput)).toEqual(expected);
    },
  );

  test.each<{
    a: number;
    b: number;
    action: Action;
    expected: number;
  }>(testCases.filter((test) => test.action === Action.Divide))(
    'should return $expected when divide $a by $b',
    ({ expected, ...rawInput }) => {
      expect(simpleCalculator(rawInput)).toEqual(expected);
    },
  );

  test.each<{
    a: number;
    b: number;
    action: Action;
    expected: number;
  }>(testCases.filter((test) => test.action === Action.Multiply))(
    'should return $expected when multiply $a by $b',
    ({ expected, ...rawInput }) => {
      expect(simpleCalculator(rawInput)).toEqual(expected);
    },
  );

  test.each<{
    a: number;
    b: number;
    action: Action;
    expected: number;
  }>(testCases.filter((test) => test.action === Action.Exponentiate))(
    'should return $expected when raising the $a to the power $b',
    ({ expected, ...rawInput }) => {
      expect(simpleCalculator(rawInput)).toEqual(expected);
    },
  );
});
