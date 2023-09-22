const pokemonList = document.querySelector("#pokemonList");
const headerButtons = document.querySelectorAll(".btn-header");
const logo = document.getElementById("pokemon-logo")
let URL = "https://pokeapi.co/api/v2/pokemon/";

logo.addEventListener("click",function(){
   location.assign("http://127.0.0.1:5500/pokeDex.html")
})

for (let i = 1; i <= 25; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => displayPokemon(data))
}

function displayPokemon(pokemon) {

    let types = pokemon.types.map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`);
    types = types.join('');

    let pokemonId = pokemon.id.toString();
    if (pokemonId.length === 1) {
        pokemonId = "00" + pokemonId;
        // console.log(pokemonId)
    } else if (pokemonId.length === 2) {
        pokemonId = "0" + pokemonId;
        
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokemonId}</p>
        <div class="pokemon-image">
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        </div>
        <div class="pokemon-info">
            <div class="name-container">
                <p class="pokemon-id">#${pokemonId}</p>
                <h2 class="pokemon-name">${pokemon.name}</h2>
            </div>
            <div class="pokemon-types">
                ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${pokemon.height}m</p>
                <p class="stat">${pokemon.weight}kg</p>
            </div>
        </div>
    `;
    pokemonList.append(div);
}

headerButtons.forEach(button => button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = 1; i <=25; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(buttonId === "see-all") {
                    displayPokemon(data);
                } else {
                    const types = data.types.map(type => type.type.name);
                    if (types.some(type => type.includes(buttonId))) {
                        displayPokemon(data);
                    }
                }

            })
    }
}))
