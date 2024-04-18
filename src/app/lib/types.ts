export type Pokemon = {
    name: string;
    url: string;
  };


  export type PokemonSingle = {
    name: string;
    id: number;
    types: { name: string }[];
    imageUrl: string;
    stats: { name: string; value: number }[];
    abilities: { name: string; description: string }[];
  }