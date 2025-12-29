// Chatgpt use cases
// https://chatgpt.com/c/6952a2f9-6c10-8322-a13a-cea1438119f7
// Make everything mutable
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
};
// this removed readonly associated with the keys

// Make everything required
type RequiredAll<T> = {
  -? [K in keyof T]: T[K]
};

// Key remapping
type WithGetters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

type User1 = {
  id: number;
  name: string;
};

type UserGetters = WithGetters<User1>;

// Result
// {
//   getId: () => number;
//   getName: () => string;
// }


// Filtering Keys (conditional mapping)
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K]
};

type Mixed = {
  id: number;
  name: string;
  active: boolean;
};

type StringsOnly = OnlyStrings<Mixed>;

// Result

// {
//   name: string;
// }


// Wrap values in Promises
type Promisify<T> = {
  [K in keyof T]: Promise<T[K]>
};

type API = {
  fetchUser: User;
  fetchPosts: Post[];
};

type AsyncAPI = Promisify<API>;

