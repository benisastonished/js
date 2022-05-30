/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
const N = parseInt(readline());
var input = readline();

const go = (N, input) => {
    if(N === 0 || input === null)
        return 0

    let inputs = input.split(' ')
    inputs  = inputs.sort((a, b) => parseInt(a) - parseInt(b));

    let prev = Number.NEGATIVE_INFINITY

    for (let i = 0; i < N; i++) {
        curr = inputs[i]

        if(i !== N-1 && 
            Math.sign(prev) === Math.sign(curr)) {
            prev = curr
            continue
        }
        
        if(Math.abs(prev) < Math.abs(curr))
            return prev

        return curr    
    }
}

console.log(go(N, input));
