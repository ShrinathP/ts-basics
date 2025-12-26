// named tuple
type ThreeDCoordinate = [x: number, y: number, z: number]
// non named tuple
type sample = [number, string, number]

function add3DCoordinate(c1: ThreeDCoordinate, c2: ThreeDCoordinate): ThreeDCoordinate {
    return [c1[0] + c2[0], c1[1] + c2[2], c1[2] + c2[2]]
}

console.log(add3DCoordinate([0, 100, 0], [10, 20, 30]));

// functions in a tuple
// first func returns string
// 2nd func sets the value
// similar to useState
function simpleStringState(initial: string): 
[() => string, (v: string) => void] {
    // this is a closure 
    // so initial's value is remembered inside
    let str: string = initial;
    return [
        () => str,
        (v: string) => {
            str = v
        }
    ]
}

const [str1getter, str1setter] = simpleStringState("hello");
const [str2getter, str2setter] = simpleStringState("jack");
console.log(str2getter());
console.log(str1getter());
str1setter("goodbye")
console.log(str1getter());
console.log(str2getter());

// readonly tuple
// Elements cannot be modified, added or removed after initialization

// NO TYPE SAFETY AFTER INITIAL VALUES
// Tuples only have strongly defined types for the initial values:
// normal tuple
let ourTuple: [number, boolean, string];
// initialize correctly
ourTuple = [5, false, 'Coding God was here'];
// We have no type safety in our tuple for indexes 3+
ourTuple.push('Something new and wrong');
console.log(ourTuple);

// readonly tuple
// define our readonly tuple
const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding God'];
//uncomment below throws error as it is readonly.
// ourReadonlyTuple.push('Coding God took a day off');

