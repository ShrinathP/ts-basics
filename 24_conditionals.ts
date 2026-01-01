import fetch from "node-fetch";

interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

type FetchPokemonResult<T> = T extends undefined
  ? Promise<PokemonResults>
  : void;

function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
  cb?: T
): FetchPokemonResult<T> {
  if (cb) {
    fetch(url)
      .then((resp) => resp.json() as Promise<PokemonResults>)
      .then((val) => cb(val));
    return undefined as FetchPokemonResult<T>;
  } else {
    return fetch(url).then((resp) => resp.json()) as FetchPokemonResult<T>;
  }
}

// fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
//   data.results.forEach((pokemon) => console.log(pokemon.name));
// });

(async function () {
  // here as well we need to cast to PokemonResults, 
  const data = <PokemonResults>(
    await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10")
  );
  data.results.forEach((pokemon) => console.log(pokemon.name));
})();
