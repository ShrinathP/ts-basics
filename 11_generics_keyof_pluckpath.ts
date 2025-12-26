
// chatgpt
// Pick<T, K>
// “Create a new type by selecting a subset of properties K from type T.”
// Pick picks multiple keys and creates objects of it

// ##2
// Advanced Real - world Versions
// A Pluck Many function to pluck multiple paths at same time
// using Pick<T,K>
function pluckMany<T, K extends keyof T>(
  items: T[],
  keys: K[]
): Pick<T, K>[] {
  return items.map(item => {
    const result = {} as Pick<T, K>;
    for (const k of keys) {
      result[k] = item[k];
    }
    return result;
  });
}

const basicInfo = pluckMany(dogs, ["name", "age"]);
console.log(basicInfo);

// type: [string, number][]

// ## 4
// Pluck and Transform
// takes T type, a K which is a keyof T, and an R type
// items array
// key 
// transform function which takes the value and whole object
function pluckWithTransform<T, K extends keyof T, R>(
  items: T[],
  key: K,
  transform: (value: T[K], item: T) => R
): R[] {
  return items.map(item => transform(item[key], item))
}

const agesInDogYears = pluckWithTransform(dogs, "age", (age, dog) => age * 7);


// ## 5
// Pluck and filter null/undefined
function pluckDefined<T, K extends keyof T>(
  items: T[],
  key: K
): NonNullable<T[K]>[] {
  return items
    .map(item => item[key])
    .filter((v): v is NonNullable<T[K]> => v != null);
    // .filter(v => v != null)
    // above filte is not enough as it works only for concrete types
    // doesnt work for generics
    // as TS cannot prove v != null narrows T.

}

type Order = {
  id: string;
  couponCode?: string;
};

const orders: Order[] = [
  {id: "2", couponCode: "AADAD"},
  {id: "22"},
  {id: "21", couponCode: "QEQEWQW"},
]

const coupons = pluckDefined(orders, "couponCode")
console.log(coupons);

