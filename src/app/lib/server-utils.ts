"use server"

import { Pokemon,PokemonSingle } from "@/app/lib/types";

export async function searchResults(search: string) {
   
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    );
    const data = await res.json();
    return data?.results
      ?.filter((item: Pokemon) => {
       // console.log('@@@item filter',item)
        return item?.name?.toLowerCase().includes(search.toLowerCase())
      })
      .map((item: Pokemon) => {
        console.log('@@@@item map',item)
        return item
      })
      .slice(0, 200);
      
  }


  export async function singlePokemonData(id: string): Promise<PokemonSingle> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    console.log('data',data)
  
  
  
    const stats = data?.stats?.map((stat: { stat: { name: string }; base_stat: number }) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));
  
    const abilities = data?.abilities?.map((ability: 
      { ability: { name: string } }
    ) => ({
      name: ability.ability.name,
    }));
  
    return {
      data: data,
      name: data?.name,
      id: data?.id,
      imageUrl: data?.sprites.other["official-artwork"].front_default,
      stats,
      abilities,
    };
  };