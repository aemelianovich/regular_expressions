// 1
// Return true if the string contains latin alphabet, latin digits, underscore and dollar sign - otherwise false
// myRegExp.test('привет'); // false
// myRegExp.test('234dgdg_$'); // true
const rgx1_1 = /^[a-zA-Z0-9_$]+$/;
const rgx1_2 = /^[\w$]+$/;

// 2
// Create an array from string where dividers should be symbols .,; or space(consecutive spaces should be treates as one)
// 'foo    bla.bar,gd;4'.split(myRegExp); // ['foo', 'bla', 'bar', 'gd', '4']
const rgx2_1 = /\s+|[.,;]/;

// 3
// function that can get string with parametrized template and object that should be used to replace parameters with values
// Hello, Bob! Your age is 10.
// const res = format('Hello, ${user}! Your age is ${age}.', {user: 'Bob', age: 10});

const format = (
  str: string,
  params: { [key: string]: number | string | boolean },
): string => {
  const rgx = /\${(.+?)}/g;
  const res = str.replaceAll(rgx, (substr: string, key: string) => {
    const value = params[key];
    return value?.toString() ?? '';
  });

  return res;
};

// 4
// Remove all dublicate substrings from the string.
// Substring can have 1,2 or 3 symbols
// 'aaaabbbbczzzz'.replace(myRegExp, replaceVal) == 'abcz';
// 'abababbbabcabc'.replace(myRegExp, replaceVal) == 'abbabc';
// 'foofoobabaaaazze'.replace(myRegExp, replaceVal) == 'foobaaze';
const rgx4_1 = /(.{1,3}?)\1+/g;
const rgx4_2 = /(.|..|...)\1+/g;

// 5
// Create a function that can find arithmetic operations in the string and replace with result
// const expr1 = calc(`
// Какой-то текст (10 + 15 - 24) ** 2
// Еще какой-то текст 2 * 10
// `);

// const result = `
// Какой-то текст 1 + 3 + 4
// Еще какой-то текст 20
// `;
// expr1 is equal to result

const calc = (str: string): string => {
  const reg = /[(\d][()+/\-*\d ]+[)\d]/g;
  return str.replace(reg, (...args) => {
    console.log(args[0]);
    return Function('', `return ${args[0]}`)();
  });
};

export { rgx1_1, rgx1_2, rgx2_1, format, rgx4_1, rgx4_2, calc };
