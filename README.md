# Regular Expressions workshop

Practice with regular expressions

## 1

Return true if string contains latin alphabet, latin digits, underscore and dollar sign - otherwise false
myRegExp.test('привет'); // false
myRegExp.test('234dgdg$'); // true

```js
const rgx1_1 = /^[a-zA-Z0-9\_\$]+$/;
const rgx1_2 = /^[\w\$]+$/;
```

## 2

Return true if the string contains latin alphabet, latin digits, underscore and dollar sign - otherwise false
'foo bla.bar,gd;4'.split(myRegExp); // ['foo', 'bla', 'bar', 'gd', '4']

```js
const rgx2_1 = /(?:\s+|\.|\,|\;)/;
```

## 3

Function that can get string with parametrized template and object that should be used to replace parameters with values

Hello, Bob! Your age is 10.
const res = format('Hello, ${user}! Your age is ${age}.', {user: 'Bob', age: 10});

```js
const format = (
  str: string,
  params: { [key: string]: number | string | boolean },
): string => {
  const rgx = /\${(.+?)}/g;
  const res = str.replaceAll(
    rgx,
    (substr: string, key: string, ...args: any[]) => {
      const value = params[key];
      return value?.toString() ?? '';
    },
  );

  return res;
};
```

## 4

Remove all dublicate substrings from the string.
Substring can have 1,2 or 3 symbols

'aaaabbbbczzzz'.replace(myRegExp, replaceVal) == 'abcz';
'abababbbabcabc'.replace(myRegExp, replaceVal) == 'abbabc';
'foofoobabaaaazze'.replace(myRegExp, replaceVal) == 'foobaaze';

```js
const rgx4_1 = /(.{1,3}?)(\1+)/g;
const rgx4_2 = /(.|..|...)(\1+)/g;
console.log('foofoobabaaaazze'.replace(rgx4_1, '$1'));
```

## 5

Create a function that cab find arithmetic operations in the string and replace with result
const expr1 = calc('
Какой-то текст (10 + 15 - 24) \*\* 2
Еще какой-то текст 2 \* 10
');

const result = '
Какой-то текст 1
Еще какой-то текст 20
';

// expr1 is equal to result

```js
const calc = (str: string): string => {
  return str.replace(
    /(?:\(\d+|\d+)(?:(?: )*(?:\+|-|\*|\*\*|\\)(?: (?:\()*)*(?:\d+)(?:\))*)+/gim,
    (...args) => {
      console.log(args[0]);
      return Function('', `return ${args[0]}`)();
    },
  );
};
```
