export default async function fetchNPokemonByColor(n, color) {
  const url = `https://pokeapi.co/api/v2/pokemon-color/${color}/`;
  const colorMatches = await fetchData(url);

  let pokeOut = [];
  for (let i = 0; i < n; i += 1) {
    const currPokemon = await fetchPokemonByName(
      colorMatches.pokemon_species[i].name
    );
    pokeOut.push(currPokemon);
  }
  return pokeOut;
}

async function fetchPokemonByName(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
  const pokemon = await fetchData(url);
  return {
    id: pokemon.id,
    name: pokemon.name,
    img: pokemon.sprites.front_default,
  };
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return {};
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching " + url + ": ", error);
  }
}
