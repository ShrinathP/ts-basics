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
  cb: (data: PokemonResults) => void
): void;
function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
): Promise<PokemonResults>;
function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
  cb?: (data: PokemonResults) => void
): unknown {
  if (cb) {
    fetch(url)
      .then((resp) => resp.json() as Promise<PokemonResults>)
      .then((val) => cb(val));
    return undefined;
  } else {
    return fetch(url).then((resp) => resp.json());
  }
}

// fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
//   data.results.forEach((pokemon) => console.log(pokemon.name));
// });

(async function () {
  // here as well we need to cast to PokemonResults, 
  const data = (
    await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10")
  );
  data.results.forEach((pokemon) => console.log(pokemon.name));
})();
