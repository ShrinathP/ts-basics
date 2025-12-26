interface Coordinate {
    x: number,
    y: number,
}




//Function Overloading
//Overload Signature
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(s: string): Coordinate;

//Implementation Signature
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
    //unknown is basically any but you have to cast it
    let coord: Coordinate = {
        x: 0,
        y: 0,
    };

    //check the type of arg1 and based on it decide
    if (typeof arg1 === 'string') {
        (arg1 as string).split(",").forEach(part => {
            const [key, val] = part.split(':');
            //fill coord
            coord[key as 'x' | 'y'] = parseInt(val, 10);
        });
    } else if (typeof arg1 === 'object') {
        coord = {
            ...(arg1 as Coordinate)
        }
    } else {
        coord = {
            x: arg1 as number,
            y: arg2 as number
        }

    }

    return coord;

}

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 10, y: 20 }));
console.log(parseCoordinate("x:12,y:33"));












function parseCoordinateFromObject(obj: Coordinate): Coordinate {
    return {
        ...obj,
    }
}

function parseCoordinateFromNumbers(x: number, y: number): Coordinate {
    return {
        x,
        y
    }
}