// ## 1
// Making value readonly
interface Cat {
  // readonly name: string;
  // you can make name readonly
  name: string;
  breed: string;
}

// ## 2
// make another type Readonly, all values will be Readonly
type ReadonlyCat = Readonly<Cat>;

function makeCat(name: string, breed: string): ReadonlyCat {
  return {
    name,
    breed,
  };
}

const usul = makeCat("Usul", "Tabby");
// usul.name = "Pieter"; //not allowed

// ## 4
// Readonly Tuple
function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}
const c1 = makeCoordinate(10,20,30);
// c1[0] = 50; //not possible



// ## 3 as const
// Array Immutability at compile time
// Array Readonly - as const
const reallyConst = [1,2,3];
// below should have thrown error, but it doesnt, as the array is const but its values arent
reallyConst[0] = 50;
const reallyConst2 = [1,2,3] as const;
// reallyConst2[0] = 50; // this will throw error