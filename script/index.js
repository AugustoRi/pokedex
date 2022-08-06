const form = document.querySelector("form");
const searchUser = document.querySelector("#search-pokemon");
const buttonPrevPokemon = document.querySelector("#prev-pokemon");
const buttonNextPokemon = document.querySelector("#next-pokemon");

const pokemonImg = document.querySelector(".pokemon-img");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");

let pokemonSelected = 1;

const getPokemons = async (pokemon) => {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const response = await fetch(baseUrl);

  if (response.status !== 200) {
    return false;
  }

  const data = await response.json()
  return data;
};

const renderPokemon = async (pokemon) => {
  pokemonName.textContent = "Carregando...";
  pokemonNumber.textContent = "";

  const data = await getPokemons(pokemon);

  if (!data) {
    pokemonImg.style.display = "none";
    pokemonName.textContent = "error";
    pokemonNumber.textContent = "";
    pokemonSelected = 0;
    return;
  }

  let filteredImg = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];

  if (filteredImg === null) {
    filteredImg = data["sprites"]["front_default"];
  } 

  pokemonImg.style.display = "block";
  pokemonName.textContent = data.name;
  pokemonNumber.textContent = data.id;
  pokemonImg.src = filteredImg;
  searchUser.value = "";
  pokemonSelected = data.id;
  console.log(pokemonSelected);
}

renderPokemon(pokemonSelected);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPokemon(searchUser.value.toLowerCase());
});

buttonPrevPokemon.addEventListener("click", (e) => {
  if (pokemonSelected > 1) {
    pokemonSelected -= 1;
    renderPokemon(pokemonSelected);
  }
});

buttonNextPokemon.addEventListener("click", (e) => {
  pokemonSelected += 1;
  renderPokemon(pokemonSelected);
});
