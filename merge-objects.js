const merge = (...objects) => 
    objects.reduce((p, c) => copyObjToTarget(c, p), {})

function copyObjToTarget(from, to={}) {
    for (let[name,val] of Object.entries(from)) {
        to[name] = isPrimitive(val) ? val : copyObjToTarget(val, to[name])
    }
    return to
}

// Assumes no functions.
const isPrimitive = (val) => 
    val === null || typeof val !== 'object'

const o1 = { med1: { a: 10, b: 12 }, med2: { c: 14, d: 16 } }
const o2 = { med1: { e: 18, f: 20 }, med2: { g: 22, h: 24 } }
console.log(JSON.stringify(merge(o1, o2), null, 2))
