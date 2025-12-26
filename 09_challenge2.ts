// Implement forEach, filter and map using reduce
// and by type safe

function myForEach<T>(items: T[], forEachFunc: (v: T) => void) {
    items.reduce((acc, v) => {
        forEachFunc(v);
        return undefined;
    }, undefined)
}

myForEach(["a", "b", "c"], (v) => console.log(`forEach ${v}`));

function myFilter<T>(items: T[], filterFunc: (v: T) => boolean): T[] {
    // return items.reduce((a, v) =>
    //     (filterFunc(v) ? [...a, v] : a), []);
    // above throws error as reduce doesnt know the type of accumulator
    // Fix1 Pass reduce<T[]> - better
    return items.reduce<T[]>((a, v) =>
        (filterFunc(v) ? [...a, v] : a), []);
}

// Fix2 Pass accumulator [] as T[] - 
// Trust me accumulator is T[] type
function myFilter2<T>(items: T[], filterFunc: (v: T) => boolean): T[] {
    return items.reduce((a, v) =>
        (filterFunc(v) ? [...a, v] : a), [] as T[]);
}

console.log(myFilter([1, 2, 3, 4, 5, 6, 7, 8], (v) => v % 2 === 0));

// Map function takes an input of type T and returns K
function myMap<T, K>(
    items: T[],
    mapFunc: (v: T) => K
): K[] { 
    return items.reduce((a, v) =>
        [...a, mapFunc(v)], [] as K[]);
}

// using K[] as reduce paramter
function myMap2<T, K>(
    items: T[],
    mapFunc: (v: T) => K
): K[] { 
    return items.reduce<K[]>((a, v) =>
        [...a, mapFunc(v)], []);
}

// ⚡ Better (performance-friendly) version
// avoid spreading inside reduce 
// spreading creates a new array, use arr.push
function myMap3<T, K>(
    items: T[],
    mapFunc: (v: T) => K
  ): K[] {
    return items.reduce<K[]>((a, v) => {
      a.push(mapFunc(v));
      return a;
    }, []);
  }
  
  console.log(myMap3([1, 2, 3, 4, 5, 6, 7, 8], (v) => (v * 10).toString()));