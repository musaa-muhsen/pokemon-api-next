import React from 'react'
//import { notFound } from 'next/navigation';
import { singlePokemonData } from '@/app/lib/server-utils';
import Image from 'next/image';
import ClientPoke from '@/app/components/ClientPoke';
import { ClientLink } from '@/app/components/ClientLink';

//type TypeColor = Record<string, string>;

// what would the type be for this 
const typeColor: Record<string, string> = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const PokemonPage = async ({ 
  params
}: { 
    params: { slug: string } 
 }) => {
  //console.log('params',params)
  const pokemon = await singlePokemonData(params.slug);
 // console.log('pokemon',pokemon);

  // if (!data) {
  //   notFound();
  // }
  return (
    <>
   <ClientLink />
    <ClientPoke data={pokemon} />
     <div className="flex items-center justify-center h-screen">
  <div className="mx-auto max-w-md px-6 py-4 bg-white shadow-md overflow-hidden md:max-w-2xl">
    <h1 className="text-2xl font-bold mb-2 capitalize">{pokemon?.name}</h1>
     <img className="w-full h-64 object-cover mb-6" src={pokemon.imageUrl} alt={pokemon.name} /> 
    {/* <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.order}.png`}
                alt={pokemon.name}
                width={200}
                height={200}
              /> */}

    <h2 className="text-xl font-bold mb-2">Stats</h2>
    <ul className="mb-4">
      {pokemon?.stats?.map((stat) => (
        <li key={stat?.name} className="text-gray-700">
          <strong>{stat?.name}:</strong> {stat?.value}
        </li>
      ))}
    </ul>

    <h2 className="text-xl font-bold mb-2">Abilities</h2>
    <ul>
      {pokemon?.abilities?.map((ability) => (
        <li key={ability?.name} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <h3 className="font-bold">{ability?.name}</h3>
        </li>
      ))}
    </ul>
  </div>
</div>
      
     
    </>
  )
}

export default PokemonPage