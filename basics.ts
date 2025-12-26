// Lesson 01

let userName: string = "Jack"
let hasLoggedIn: boolean = true
userName += " Herrington"

console.log(userName);

let myNumber: number = 10;

let myRegex: RegExp = /foo/;

const names: string[] = userName.split("")

const myValues: Array<number> = [1,2,3]

// Type interface
interface Person {
    first: string;
    last: string;
}
const myPerson: Person = {
    first: "Jack",
    last: "Herrington",
}

// Objects as maps, assigning values, Record
const ids: Record<number, string> = {
    10:"a",
    20:"b"
}

ids[30] = "c"

// conditionals
if (ids[30] === "D") {

}


// for loops, maps etc i is inferred to be a number
// i is inferred to be number
for (let i = 0; i < 10; i++) {
    console.log(i);
}
// v is inferred to be number
[1,2,3].forEach((v) => console.log(v));

// if output is number out is inferred to be array of string
const out = [4,5,6].map((v) => v * 10)
// if output is string out is inferred to be array of string
const out2 = [4,5,6].map((v) => `${v * 10}`)
// below will give error
// const out3: number[] = [4,5,6].map((v) => `${v * 10}`)