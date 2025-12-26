// this tries to import a js, 
// so we need to compile functions.ts to js
const { getName } = require('./functions')

console.log(getName());
console.log(getName({first: "a", last: "b"}));