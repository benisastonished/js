
// for (let i = 0; i < N; i++) {
//     const t = parseInt(inputs[i]);
// }

// // Write an answer using console.log()
// // To debug: console.error('Debug messages...');

// console.log('0');

// Sort the input. Walk the sorted input
// until either the final value, or the sign
// changes. At this points, compare the current
// value with previous. If absolute(previous) 
// is less than absolute(current), return previous,
// otherwise return current.

// def go(N, input)
// if input not supplied, return 0
// if N === 1, return first value
// let values be split(input)
// let sortedValues be sort(values)
// for each value curr in sortedValues
//   if not final value, and sign(prev) === sign(curr)
//     continue
//   
//   if absolute(prev) < absolute(curr)
//     return prev
//
//  return curr
// end for
// end def

const go = (N, input) => {
    if(!input) return 0
    
    let values = input.split(' ')

    if(N === 1) return values[0]

    let sortedValues = values.sort((a, b) => parseInt(a) - parseInt(b))
    let prev = Number.NEGATIVE_INFINITY

    for(let x = 0; x < N; x++) {
        let curr = sortedValues[x]
        if(x !== N-1 && Math.sign(curr) === Math.sign(prev)) {
            prev = curr
            continue
        }

        if(Math.abs(prev) < Math.abs(curr))
            return prev
        
        return curr
    }
}

const N = parseInt(readline());
var input = readline()
console.log(go(N, input))
