export type Pokemon = {
    name: string;
    url: string;
  };


  export type PokemonSingle = {
    name: string;
    order: number;
    imageUrl: string;
    stats: { name: string; value: number }[];
    abilities: { name: string; description: string }[];
  }