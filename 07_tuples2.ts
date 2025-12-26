// Tuples Use Cases
// https://blog.logrocket.com/exploring-use-cases-typescript-tuples/#typescript-tuples-use-cases

// ## 1
// Using tuples in REST parameters
// In simple terms, when a REST parameter is a tuple type, 
// the tuple type can be expanded into a sequence of parameter lists.

declare function example(...args: [string, number]): void;

// When the function is called, args, 
// is expanded to look exactly like the function signature below

declare function example(args0: string, args1: number): void;


// ##2
// Variadic Arguments
// If we want to keep the number of args variadic/variable no of args
declare function example(...args: [...string[], number]): void;
// “example takes any number of strings, followed by exactly one number at the end.”

example(10);                 // ❌ (no strings, but number is OK? → depends)
example("a", 10);            // ✅
example("a", "b", 10);       // ✅


// ## 3
// Generics for Variadic Type
// Creating a reusable variadic type
type Variadic<T extends unknown[], Last> = [...T, Last]
// Use it - use the type
type StringThenNumber = Variadic<string[], number>;
declare function example(...args: StringThenNumber): void;


// ## 4
// Creating an implementor instead of the declared functions above
// so that it can be RUN
// IMP: with declare function, ts will compile, but not RUN
// you can either declare or implement
/*
function example(...args: StringThenNumber): void {
    // Last argument is guaranteed to be a number
    const level = args[args.length - 1];

    // All preceding arguments are guaranteed to be strings
    const messages = args.slice(0, -1);

    console.log("Level:", level);
    console.log("Messages:", messages.join(" "));
}
*/


// Generic variadic function (real-world pattern)
declare function logWithLevel<T extends unknown[]>
    (...args: [...T, number]): void;

    // In summary, a tuple type 
// forces us to pass the appropriate types to the respective function signatures. 

// ## 5
// Another Example - Matches type
// Variadic function implementation with tuple params
type Matches = [string, boolean];

const arsenal: Matches = ['Man City', true];
const city: Matches = ['Man United', true];
const hotspur: Matches = ['Liverpool', true];

function processMatches(...matches: [...Matches[], string]): void {
  const lastMatch = matches.pop();
  console.log('Previous matches:');
  for (const match of matches) {
    console.log(match[0]);
  }
  console.log('Last match:', lastMatch);
}

processMatches(arsenal, city, hotspur, 'Chelsea vs. Arsenal');