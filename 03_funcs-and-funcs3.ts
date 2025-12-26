// Create a mapper function
// “A Mapper is a function that 
// takes a value of type T and transforms it into a value of type R.”
// input → transform → output
export type Mapper<T, R> = (value: T) => R;

//const variable is an implementation of Mapper is defined as =
const numberToString: Mapper<number, string> = (value) => {
    return `Number is ${value}`;
}

// Real world uses
// 1. Mapping API data -> UI Model (very common)
type ApiUser = {
    id: number,
    first_name: string,
    last_name: string,
}

type UiUser = {
    id: number,
    fullName: string
}

const apiToUiUser: Mapper<ApiUser, UiUser> = (apiUser) => ({
    id: apiUser.id,
    fullName: `${apiUser.first_name} ${apiUser.last_name}`,
  });

apiToUiUser({id: 2, first_name: 'S', last_name: 'P'});

// 2. Mapping values inside arrays
const double: Mapper<number, number> = (v) => v * 2;
const result = [1, 2, 3].map(double);
// result: number[]

// 3. Mapping domain model -> DTO
type Order = {
    id: string,
    total: number,
}

type OrderDTO = {
    id: string,
    totalInPaise: number,
}

const orderToDto: Mapper<Order, OrderDTO> = (order) => ({
    id: order.id,
    totalInPaise: order.total * 100,
  });

// 4. Mapping with generics (composition)
function mapValue<T, R>(value: T, mapper: Mapper<T, R>): R {
    return mapper(value);
}

const squared = mapValue(5, (v) => v * v); // number
const length = mapValue("hello", (s) => s.length); // number


// 5. Async Mapper
export type AsyncMapper<T, R> = (value: T) => Promise<R>;

const fetchUserName: AsyncMapper<number, string> = async (id) => {
  return `User-${id}`;
};



