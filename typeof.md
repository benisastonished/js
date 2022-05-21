`typeof` is a unary operator that returns a string indicating the type of its unevaluated (more on this, later) operand.

The algorithm for typeof is defined here, and can be approximated thus:

> If the operand is undeclared then return `'undefined'`, else
> 
> If the operand is in a temporal dead zone, throw an error, else
> 
> If the operand is `null`, return `'object'`, else
> 
> If the operand is a function, return `'function'`, else
> 
> If the operand is of a primitive type, return the string
> representation of that primitive type, else
> 
> Return 'object'

There are currently seven primitive types in JavaScript:

1. String
2. Number
3. Boolean
4. undefined
5. null
6. BigInt
7. Symbol

So:

<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

    console.log(typeof foo) // undefined (!)
    console.log(typeof null) // 'object' (!)
    console.log(typeof function(){}) // function (!)
    console.log(


<!-- end snippet -->

typeof true; //returns the primitive type "boolean"
typeof 123; //returns the primitive type "number"
typeof null //returns "object" which is a mistake, but so far there is no fix in another ECMAScript version, just talk about doing so.
typeof object //returns "object", which makes sense
To expound further on Pointy's answer, there is in every JavaScript object an internal property known as [[Class]] in ECMAScript 5. In order to display the actual value of the object, you can reference the [[Class]] property using: Object.prototype.toString. To avoid some of the specialized built-in objects overwriting toString you use the internal method of Call that will reveal the actual object type.

So instead of getting the generic object back from toString:

var dateObject = Object.prototype.toString(new Date);
document.write(dateObject);//[object Object]
You can get the actual object type using Call:

var dateObject = Object.prototype.toString.call(new Date);
document.write(dateObject);//[object Date]
