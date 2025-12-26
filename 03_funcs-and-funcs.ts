export function printToFile(text: string, callback: (v: number) => void): void {
    console.log(text);
    callback(2)
}

export function arrayMutate(numbers: number[], mutate: (v: number) => number): number[] {
    return numbers.map(mutate)
}

console.log(arrayMutate([1, 2, 3], (v) => v * 10));
