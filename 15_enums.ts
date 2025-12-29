// ## 1
// Enums - instead of const and comparing, change to enums
// const beforeLoad = "beforeLoad";
// const loading = "loading";
// const loaded = "loaded";

enum LoadingState {
  beforeLoad = "beforeLoad",
  loading = "loading",
  loaded = "loaded",
}

const englishLoadingStates = {
  [LoadingState.beforeLoad]: "Before Load",
};

const isLoading = (state: LoadingState) => state === LoadingState.loading;
console.log(isLoading(LoadingState.beforeLoad));

// ## 2
// literal types
// Number literals in function params

function rollDice(dice: number): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}
console.log(rollDice(4));

function rollDice2(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}
// console.log(rollDice2(4)); // this will throw error


// ## 3
// String Literals in Function overloading
function sendEvent(name: "addToCart", data: {productId: number}): void;
function sendEvent(name: "checkout", data: {cartCount: number}): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name}: ${JSON.stringify(data)}`); 
}

// below will throw error
// sendEvent("addToCart", { count: 2})
sendEvent("addToCart", { productId: 2})