import houses from './05_challenge_1_houses_d'
interface House {
    name: string;
    planets: string | string[];
}


interface HouseWithID {
    id: number;
    name: string;
    planets: string | string[];

}

//Overload signatures
// 1
function findHouses(houses: string): HouseWithID[];
// 2
function findHouses(
    houses: string,
    filter: (house: House) => boolean
): HouseWithID[];
// 3
function findHouses(houses: House[]): HouseWithID[];
// 4
function findHouses(
    houses: House[],
    filter: (house: House) => boolean
): HouseWithID[]



// Implementation Signature
function findHouses(
    houses: string | House[],
    filter?: (house: House) => boolean //optional for some impls
): HouseWithID[] {

    const housesarr: House[] = typeof houses === 'string' ? JSON.parse(houses) : houses;
    return (filter ? housesarr.filter(filter) : housesarr)
        .map((house) => ({
            id: housesarr.indexOf(house),
            ...house,
        }))

}

console.log(
    findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
);

console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));