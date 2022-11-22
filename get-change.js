const acceptedPatterns = [
    [/^£\d+\.\d+$/, (s) => s.replaceAll(/[£.]/g, '')], 
    [/^£\d+$/, (s) => `${s.replace('£', '')}00`], 
    [/^\d+$/, (s) => s] ];

const getChange = (input) => {
    if (!input) {
        return 'No change given.'
    }
    
    let [,transform] = acceptedPatterns.find(([pattern]) => 
        pattern.test(input)) ?? [];

    if (!transform)
        throw new Error('Invalid input.');

    let pennies = Number(transform(input));
    let changeToGive = [];
    const denominations = [[200, "£2"], [100, "£1"], 
                           [50, "50p"], [20, "20p"], 
                           [10, "10p"], [5, "5p"], 
                           [2, "2p"], [1, "1p"]];

    while (denominations.length) {
        const [d,s] = denominations.shift();
        const q = Math.trunc(pennies / d);
        if (q >= 1) {
            pennies -= q * d;
            changeToGive.push(`${q} ${s}`);
            if (!pennies)
                break;
        }
    }

    return changeToGive.length ? changeToGive.join(", ") : 'No change given.';
};

console.log(getChange('£1.02'))
