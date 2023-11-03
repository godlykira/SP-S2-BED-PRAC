let data = {
  player: [
    { id: 1, name: "Ash", level: 1 },
    { id: 2, name: "Misty", level: 21 },
    { id: 3, name: "Brock", level: 30 },
  ],

  pokedex: [
    { number: 1, name: "Bulbasaur", type1: "Grass", type2: "Poison" },
    { number: 2, name: "Ivysaur", type1: "Grass", type2: "Poison" },
    { number: 3, name: "Venusaur", type1: "Grass", type2: "Poison" },
    { number: 4, name: "Charmander", type1: "Fire", type2: "" },
    { number: 5, name: "Charmeleon", type1: "Fire", type2: "" },
    { number: 6, name: "Charizard", type1: "Fire", type2: "Flying" },
    { number: 7, name: "Squirtle", type1: "Water", type2: "" },
    { number: 8, name: "Wartortle", type1: "Water", type2: "" },
    { number: 9, name: "Blastoise", type1: "Water", type2: "" },
  ],

  pokemon: [
    { id: 1, owner_id: 1, dex_num: 4, hp: 100, atk: 5, def: 6 },
    { id: 2, owner_id: 2, dex_num: 1, hp: 100, atk: 5, def: 6 },
    { id: 3, owner_id: 2, dex_num: 5, hp: 160, atk: 27, def: 26 },
    { id: 4, owner_id: 2, dex_num: 9, hp: 200, atk: 52, def: 55 },
  ],
};

module.exports = data;
