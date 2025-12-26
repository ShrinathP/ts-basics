// ##1
// Creating a generic function pluck
// where you can pluck keys from the array of objects
function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: "Mimi", age: 12 },
  { name: "Toto", age: 11 },
  { name: "Maddy", age: 9 },
]

console.log(pluck(dogs, "age"));
console.log(pluck(dogs, "name"));
// below will give compile time error
// console.log(pluck(dogs, "color")); 



interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addtoCart: BaseEvent & { quantity: number, productID: string; },
  checkout: BaseEvent
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
  ): void {
    console.log([name, data]);
}

sendEvent("addtoCart", {productID: 'foo', time: 10, user: "baz", quantity: 22})
sendEvent("checkout", {time: 22, user: "tom"})