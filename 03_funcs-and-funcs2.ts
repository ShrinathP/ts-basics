export function printToFile(text: string, callback: (v: number) => void): void {
    console.log(text);
    callback(2)
}

// Type Mutation Functions
export type MutationFunction = (v: number) => number;

export function arrayMutate(
    numbers: number[], 
    mutate: MutationFunction
    ): number[] {
    return numbers.map(mutate);
}

//const myNewMutationFunction is an implementation of Mapper is defined as =
//similar to class implements interface
const myNewMutationFunction: MutationFunction = (v: number) => v*100
const myNewMutationFunction2: MutationFunction = v => v * 100


console.log(arrayMutate([1, 2, 3], (v) => v * 10));

//type behaves like interface
export type AdderFunction = (v: number) => number;

// a function that returns function
export function createAdder(num: number): AdderFunction {
    return (val: number) => num + val;
}

const addOne = createAdder(1);
console.log(addOne(55));

