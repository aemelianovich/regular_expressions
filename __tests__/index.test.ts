import {
  rgx1_1,
  rgx1_2,
  rgx2_1,
  format,
  rgx4_1,
  rgx4_2,
  calc,
} from '../src/index';

describe('Check regular expressions', () => {
  test('Return true if string contains latin alphabet, latin digits, underscore and dollar sign - otherwise false', () => {
    expect(rgx1_1.test('привет')).toBeFalsy();
    expect(rgx1_1.test('sdfg33:sg9')).toBeFalsy();
    expect(rgx1_1.test('adfdgf123LKELk_$')).toBeTruthy();

    expect(rgx1_2.test('привет')).toBeFalsy();
    expect(rgx1_2.test('sdfg33:sg9')).toBeFalsy();
    expect(rgx1_2.test('adfdgf123LKELk_$')).toBeTruthy();
  });

  test('Create an array from string where dividers should be symbols .,; or space(consecutive spaces should be treates as one)', () => {
    expect('foo    bla.bar,gd;4'.split(rgx2_1)).toEqual([
      'foo',
      'bla',
      'bar',
      'gd',
      '4',
    ]);
  });

  test('function that can get string with parametrized template and object that should be used to replace parameters with values', () => {
    expect(
      format('Hello, ${user}! Your age is ${age}.', { user: 'Bob', age: 10 }),
    ).toEqual('Hello, Bob! Your age is 10.');

    expect(format('Hello, ${user}! Your age is ${age}.', { age: 12 })).toEqual(
      'Hello, ! Your age is 12.',
    );
  });

  test('Remove all dublicate substrings from the string. Substring can have 1,2 or 3 symbols', () => {
    expect('aaaabbbbczzzz'.replace(rgx4_1, '$1')).toEqual('abcz');
    expect('abababbbabcabc'.replace(rgx4_1, '$1')).toEqual('abbabc');
    expect('foofoobabaaaazze'.replace(rgx4_1, '$1')).toEqual('foobaaze');

    expect('aaaabbbbczzzz'.replace(rgx4_2, '$1')).toEqual('abcz');
    expect('abababbbabcabc'.replace(rgx4_2, '$1')).toEqual('abbabc');
    expect('foofoobabaaaazze'.replace(rgx4_2, '$1')).toEqual('foobaaze');
  });

  test('Check a function that can find arithmetic operations in the string and replace with result', () => {
    expect(
      calc(`
    Какой-то текст (10 + 15 - 24) ** 2 + (34 + 5)
    Еще какой-то текст 2 * 10
    `),
    ).toEqual(`
    Какой-то текст 40
    Еще какой-то текст 20
    `);
  });
});
