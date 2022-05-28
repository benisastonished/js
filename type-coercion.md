# Type Coercion

 - https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/

Type conversion is the conversion of a value from one data type to another. It can be implicit or explicit.

Type coercion is an implicit form of type conversion. It occurs when operators or programming language control flow statements automatically convert values from one type to another as a programming affordance. 

The ECMAScript language implicitly performs automatic type conversion as needed.

JavaScript is a weakly-typed language, meaning [the language will implicitly perform automatic type conversion as needed](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-type-conversion). Understanding coercion is important, therefore, when learning JavaScript.

JavaScript has [seven primitive types](https://tc39.es/ecma262/#sec-ecmascript-overview). They are: **Undefined, Null, Boolean, Number, BigInt, String, and Symbol**. JavaScript also has the base reference type **Object** (and functions are, of course, callable objects).

Due to the nature of the operators and control structures that perform coercion in JavaScript, the outcome of a type coercion will only ever be a Boolean, a Number, or a String. And in the edge-case in which a comparison operator is operating on two numerics of different types (ie. BigInt and Number), then the "real mathematical value" will be used 

To understand coercion in JavaScript, therefore, you need to understand two things:

1. The various conversions to Boolean, Number and String, and
2. How language operators and control structures trigger (or do not trigger) these conversions

To clarify the distinction between (1.) and (2.) above: the `Number` built-in function enables a conversion from `1n`, a BigInt, to `1`, a Number, so _conversion_ is possible, however, JavaScript operators will never _coerce_ `1n` to `1` (they throw a `TypeError`) because of the risk of a loss of precision, even though such a conversion is supported by the language. In other words: you need to learn both the conversions that are possible, and the coercions that _actually_ occur.

Finally, before we enumerate the type conversions supported by JavaScript, we need to understand how the language coordinates the conversion of objects (ie. non-primitive values) to primitive values.

Attempting to convert an object to a primitive, and the hint is either absent or "number", JavaScript will run the following algorithm:

1. If `input` is already a primitive, do nothing and return it.
2. Call `input.valueOf()`, if the result is primitive, return it.
3. Call `input.toString()`, if the result is primitive, return it.
4. If neither `input.toString()` nor `input.valueOf()` yields a primitive, throw a `TypeError`.

If the hint is "string" (sent with conversions from `Date`), then steps 2. and 3. are reversed.

## Conversions to Boolean, Number and String

### Conversions to Boolean

When supplied with the values in the code snippet below, `Boolean(<value>)` will return `false`. 

For *all* other values, conversion to a boolean will return `true`. There is no way to create your own special object to override this behavior. 

Note that these rules mean that, possibly counterintuitively, `new Boolean(false) == true`, `[] == true`, `' ' == true`, and `'0' == true`).

<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

    console.log(Boolean(undefined))     // false
    console.log(Boolean(null))          // false
    console.log(Boolean(false))         // false
    console.log(Boolean(-0))            // false
    console.log(Boolean(0))             // false
    console.log(Boolean(NaN))           // false
    console.log(Boolean(0n))            // false
    console.log(Boolean(''))            // false
    console.log(Boolean(document.all))  // false (special case)

<!-- end snippet -->

Note the special case of `document.all`, which is an anomalous object, part of the Web platform, with behavior retained for backwards-compatibility reasons.

[Spec link](https://tc39.es/ecma262/#sec-toboolean).

### Conversions to Number

The conversions to Number are a little harder to understand than those for Boolean, because different objects have different conversion behaviors.

<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

    // From primitive values
    console.log(Number(undefined))     // NaN (!)
    console.log(Number(null))          // 0   (!)
    console.log(Number(false))         // 0
    console.log(Number(true))          // 1
    console.log(Number(1n))            // 1 (will force conversion even if loss of precision might occur)
    console.log(Number('1'))           // 1
    console.log(Number('01'))          // 1
    console.log(Number('0001'))        // 1 (etc.)
    console.log(Number(' 001 '))       // 1 (trailing and/or leading whitespace is stripped, which is similar to parseInt)
    console.log(Number('123abc'))      // NaN (behavior differs from parseInt)
    console.log(Number('1n'))          // NaN
    console.log(Number('1_000_000'))   // NaN
    console.log(Number('1,000,000'))   // NaN
    console.log(Number(Symbol()))      // TypeError: Cannot convert a Symbol value to a number (a rare impossible conversion!) 

    // From selected non-primitive values:

    // Object
    console.log(Number(Object.create(null))) // TypeError: Cannot convert object to primitive value (neither valueOf, nor toString methods exist on the prototype chain!)
    console.log(Number({}))                  // NaN
    console.log(Number({ toString() { return '123' }, valueOf() { return '456' } })) // 456 (because the prefer-number algorithm is used)
    console.log(Number({ toString() { return '123' }, valueOf: null })) // prefer-number algorithm falls-back to toString
    console.log(Number({ toString() { return {} }, valueOf: null })) // TypeError: Cannot convert object to primitive value (this totally subverts the prefer-number algorithm, resulting in an error)

    // Array:
    console.log(Number([0,0]))         // NaN
    console.log(Number([true]))        // NaN
    console.log(Number([false]))       // NaN
    console.log(Number([[],[]]))       // NaN
    console.log(Number([]))            // 0
    console.log(Number([[]]))          // 0
    console.log(Number([[[]]]))        // 0 (etc.)
    console.log(Number([1]))           // 1
    console.log(Number([[1]]))         // 1
    console.log(Number([[[1]]]))       // 1 (etc.)

    // RegExp
    console.log(/0/)                   // NaN

    // Date    
    console.log(Number(new Date())     // 1653489978477 (no. of ms since UNIX epoch)
    
<!-- end snippet -->

### Conversion to String

<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

    // From primitive values:

    console.log(String(undefined))     // 'undefined'
    console.log(String(null))          // 'null'
    console.log(String(true))          // true
    console.log(String(false))         // false
    console.log(String(-1))            // '-1'
    console.log(String(-0))            // '-0'
    console.log(String(0))             // '0'
    console.log(String(1))             // '1'
    console.log(String(NaN))           // 'NaN'
    console.log(String(Infinity))      // 'Infinity'
    console.log(String(1n))            // '1'
    console.log(String(1_000_000))     // '1000000'
    console.log(String(Symbol()))      // 'Symbol()'
    console.log(String(Symbol('foo'))) // 'Symbol(foo)'

    // From selected non-primitive values:

    // Object
    console.log(String({}))            // '[Object object]'

    // Array
    console.log(String([]))            // ''
    console.log(String([[]]))          // ''
    console.log(String([[[]]]))        // '' (etc.)
    console.log(String([,]))           // '' (because comma treated as trailing comma)
    console.log(String([,,]))          // ',' (final comma treated as trailing comma)
    console.log(String([,,,]))         // ',,' (...and again)
    console.log(String(['a','b']))     // 'a,b'

    // Function
    console.log(String(function(){ console.log('foo') })) // 'function(){ console.log('foo') }'
    console.log(String(()=>{ console.log('foo') }))              // "()=>{ console.log('foo') }"
    console.log(String(function() { /* foo */ }))                // 'function() { /* foo */ }'

    // RegExp
    console.log(String(/(?<foo>[1-9]{3})/gi))) // '/(?<foo>[1-9]{3})/gi'


<!-- end snippet -->

## The JavaScript Coercion Mechanism

JavaScript uses a hinting mechanism that enables operators to optionally specify how values, supplied as operands, should be coerced between data types. When attempting a coercion, the internal `[[toPrimitive]]` method is invoked with or without such a hint.

The hint decides the order in which attempts are made to invoke `toString` and/or `valueOf` in an attempt to perform the type conversion. `toString` and `valueOf` are inherited from `Object` by default, but can be overridden. Since ES2015, the `[[toPrimitive]]` internal method can be completely replaced, using the built-in symbol `Symbol.toPrimitive`.

Different operators and control structures supply different hints, based on the typical expectation of the programmer for that operator. For example: the unary `+` operator supplies the hint 'number', because this operator expects numeric operands. 

There are 3 algorithms for type coercion:

1. prefer-string (use toString in preference to valueOf)
2. prefer-number (use valueOf in preference to toString)
3. no-preference (defer to the data type being coerced. Built-ins use the prefer-number, except Date, which uses prefer-string)

+({toString() { return '1'} })

### x + y
Algorithm: no-preference

### == 


## Coercion Rules

In many cases, the coercion rules cannot be deduced logically: they just have to be learned, because these rules are a programming affordance designed based on a subjective idea of usefulness.

### Relational Operators (`>, <, <=, >=`)

Use the [IsLessThan](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-islessthan) abstract operation.

If both of the operands are strings, then the strings are walked up to a maximum position of the length of the shortest string. If the numeric value of the code unit at any point is not equal to the other, then return the result of that comparison. And if the code unit values are the same for this length, then the longer string is the greater value.

If one of the operands is a `BigInt` and the other is a string, then the string is coerced to a `BigInt`, and return the result of a BigInt numeric comparison.

Convert both operands to numerics (ie numbers)

If both operands are now BigInt, return the result a BigInt numeric comparison.

If both operands are now Number, return the result a Number numeric comparison.

If one operand is a Number and the other is a BigInt, [perform a comparison based on the "real mathematical value" of both operand](https://stackoverflow.com/a/72394055/38522) (ie. no further coercion occurs).

#### Implications

```
'2' < '11' // false, because the numeric value of the code unit for '2' is greater than the numeric value of the code unit for '1'
19_999_999_999_999_998 < 19_999_999_999_999_999n // false, because the "real mathematical value" of `19_999_999_999_999_998` is 20,000,000,000,000,000`, because of the way IEEE754 maps multiple values to a single representation.

```

### Unary Operators (`+, -, ~, !`)

`+` coerces its operand to Number and is incompatible with BigInt as a [least-worst option](https://stackoverflow.com/questions/69860416/why-0n-throws-an-error-but-0n-does-not) because of a potential incompatibility with asm.js. Reference types are converted ToPrimitive with the 'number' hint, with that result then converted toNumber. 

Note:

1. Using `+` with a  BigInt operand will throw a TypeError due to the potential for loss of precision.
2. Using `+` with a  Symbol operand will throw a TypeError due to the conversion being nonsensical.

`-` and `~` coerce their operand to a Number, or if the operand is a BigInt, performs the negation and returns a BigInt.

`!` coerces to Boolean.

### Binary Numeric Operators (`**, *, /, %, +, -, <<, >>, >>>, &, ^, or |`)

These operators use the abstract operation [ApplyStringOrNumericBinaryOperator](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-applystringornumericbinaryoperator). 

If either operand is a string, then perform a string concatenation.

Otherwise convert both sides to a numeric, if necessary, and perform a numeric operation.

If both numerics are of different types (ie. BigInt and Number), throw a TypeError.

Perform the numeric operation on the operands and return the result, which will be a Number or a BigInt.


### Binary Logical Operators (`&&, ||, ??`)




## `!`, `&&=`, `||=`, `if...else`, `while`, `do...while`, `for`

These operators coerce operands to booleans.

Note that the logical operators coerce to perform the necessary logical test, and then return the value of the last evaluated operand (ie. _not_ the result of the coercion). 

The conditional statements affect control flow based on the coercive result (if there is one) contained within them.

As long as you remember the conversion rules of the `Boolean` function, you're good. Note that all objects (apart from `document.all`, which is part of the Web platform, and a historical anomaly) coerce to `true`.

### `| & ^ ~, - + * / %, binary + (if neither operand is a string), unary +, == (with exceptions), != (with exceptions), <<, >>, >>>`

These operators coerce to numbers, [although they will not coerce from operands of type BigInt because these are already a numeric type](https://stackoverflow.com/a/72394055/38522). For operations involving BigInts, the real "mathematical values" of the operands, ℝ1 and ℝ2, are determined; the comparison is then performed between ℝ1 and ℝ2.

[Spec source](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-applystringornumericbinaryoperator).

### `==`

if one operand is not a string and not null or undefined

## Binary `+` 

Coerces to string if one operand is a string.


[Spec source](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-islooselyequal).

For built-in control structures and operators, JavaScript language designers make type-conversion decisions for us, using the same functionality exposed to us via the `String`, `Boolean` and `Number` constructor functions, as shown above. For the most part, errors are not thrown: the language performs implicit internal conversions, staying true to the weakly-typed nature of the language.

**Implicit coercion** is when we rely on a control structure or operator to internally perform a type conversion, and JavaScript has a set of rules to describe how this works.







See also: https://delapouite.com/ramblings/javascript-coercion-rules/
