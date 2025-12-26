
// ##1
// Making a generic function
// Replace string by T in 07_tuples.ts
function simpleState<T>(initial: T):
    [() => T, (v: T) => void] {
    // this is a closure 
    // so initial's value is remembered inside
    let str: T = initial;
    return [
        () => str,
        (v: T) => {
            str = v
        }
    ]
}

const [st1getter, st1setter] = simpleState(10);
console.log(st1getter());
st1setter(20);
console.log(st1getter());



// ##2
// Overriding inferred generic type
// suppose we set initial to null, all inferred types would be null now
// but if we want it to be "string or null" we can infer using <string | null>
// const [st2getter, st2setter] = simpleState(null);
const [st2getter, st2setter] = simpleState<string | null>(null);
console.log(st2getter());
// st2setter("10"); will throw error on simpleState(null)
st2setter("10");
console.log(st2getter());


// ##3 - Ranker
// non generic ranker
function rankerNonGeneric(items: unknown[], rank: (v: unknown) => number): unknown[] {
    return []
}

// generic ranker - which will rank the items based on ascending rank
// taking type RankItem

function ranker<RankItem>(items: RankItem[], rank: (v: RankItem) => number): RankItem[] {
    /*
    const ranks = items.map((item) => ({
        item,
        rank: rank(item)
    }))
    */
    // notifce we didnt specify the type of const ranks
    const ranks: Rank<RankItem>[] = items.map((item) => ({
        item,
        rank: rank(item)
    }))

    ranks.sort((a, b) => a.rank - b.rank)

    return ranks.map((rank) => rank.item)
}

// notifce we didnt specify the type of const ranks

// creating an interface Rank to suffice that
// but the type: RankItem isnt accessible in iterface
// so we have to make it generic

interface Rank<RankItem> {
    item: RankItem;
    rank: number;
}

// A Rank wraps any item of type RankItem and associates a numeric rank with it.
// So if:
// RankItem = string → Rank<string>
// RankItem = User → Rank<User>

// ##4
// Running this ranker with example object array pokemon
interface Pokemon {
    name: string,
    hp: number
}

const pokemon: Pokemon[] = [
    {
        name: 'Bulbasaur',
        hp: 20
    },
    {
        name: 'Megasaur',
        hp: 5
    },
    {
        name: 'Megasaur',
        hp: 22
    }
]

// ranks based on hp number
const ranks = ranker(pokemon, (pokemon) => pokemon.hp);
console.log(ranks);

// ranks based on even odd
const ranksEvenOdd = ranker(pokemon, (pokemon) => pokemon.hp % 2 == 0 ? -1*pokemon.hp: 1*pokemon.hp);
console.log(ranksEvenOdd);
