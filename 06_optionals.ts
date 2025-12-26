// optional parameters
function printIngredient(quantity: string, ingredient: string, extra?: string) {
    console.log(`${quantity} ${ingredient}`);
    console.log(`${quantity} ${ingredient} ${extra ? `${extra}` : ""}`);
}

// you cant put another required after an optional, optional has to be last

printIngredient("1C", "Flour")
printIngredient("1C", "Flour", "something more")

// optional fields
interface User {
    id: number,
    info?: {
        email?: string
    }
}

function getEmail(user: User): string {
    if (user.info) {
        // return user.info.email;
        // above will throw error
        return user.info.email!;
        // if you genuienly know better than ts, that it wouldnt be undefined
        // use exclamation
    }
    return ""
}

// using optional chaining and null coaelesing operator
function getEmailEasy(user: User): string {
    return user?.info?.email ?? "";
}

// optional callbacks
function addWithCallBack(x: number, y: number, callback: () => void) {
    console.log([x,y]);
    if( callback) {
        callback()
    }
    // other wayy
    callback?.();

}