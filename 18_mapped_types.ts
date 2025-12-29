// ##1
// Flexible object - 1 required field and one other optional
// flexible object with at least one required property.

type MyFlexibleDogInfo = {
  name: string, //must 
} & Record<string, string>; //can have any number of other properties
// all keys must be string and values must be string

// ##2
// using [key: string]: string | number
type MyFlexibleDogInfo2 = {
  name: string, //must 
  [key: string]: string | number;
}

const dog: MyFlexibleDogInfo = {
  name: "LG",
  breed: "Mutt",
  // age: 22 // this wont work with Record<string, string>
}

const dog2: MyFlexibleDogInfo2 = {
  name: "LG",
  breed: "Mutt",
  age: 22
}


// ## 3
// Mapped Types
// Think of them as:
// Array.map() but for object types 
interface DogInfo {
  name: string,
  age: number
}

type OptionalFlags<Type> = {
  [Property in keyof Type]: boolean
}
// maps every key of the Type to boolean

type DogInfoOptions = OptionalFlags<DogInfo>;

const DogInfoOptions = {
  name: true,
  age: false
}

// ## 2
// For each property we need to create a list of functions in Listeners
// for name - onNameChange
// for age - onAgeChange
// template literals
type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]: 
  (newValue: Type[Property]) => void
} & {
  [Property in keyof Type as `on${Capitalize<string & Property>}Delete`]: 
  () => void
}

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
  throw "Needs to be implemented"
}

const lg: DogInfo = {
  name: "LG",
  age: 13
}

type DogInfoListeners = Listeners<DogInfo>;

listenToObject(lg, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
  onAgeDelete: () => {},
  onNameDelete: () => {},
})
