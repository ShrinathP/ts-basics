// Lesson 02


function addNumbers(a: number, b: number): number {
    return a + b
}

export default addNumbers

// return a string
export const addStrings = (str1: string, str2: string = ""): string => 
`${str1} ${str2}`

// or union type param and return a string
export const format = (title: string, param: string | number): string => 
`${title} ${param}`

// return void
export const printformat = (title:string, param:string | number): void => {
console.log(format(title, param));
}

// return Promise
export const fetchData = (url: string): Promise<String> => Promise.resolve(`Data from ${url} `)

// passing rest parameters
function introduce(salutation: string, ...names: string[] ): string {
    return `${salutation} ${names.join(" ")}`
}

// Misconception - typescript enforces types at run time, not at compile time

export function getName(user: { first: string; last: string }): string {
    return `${user?.first ?? "first"} ${user?.last ?? "last"}`
}