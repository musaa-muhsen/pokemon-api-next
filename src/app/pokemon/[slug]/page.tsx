import React from 'react'
//import { notFound } from 'next/navigation';
import { singlePokemonData } from '@/app/lib/server-utils';
import Image from 'next/image';
import { ClientLink } from '@/app/components/ClientLink';

import {Spinner,Skeleton,IconButton,TextField, Box , CheckboxCards, Flex, Text, Avatar, Card} from '@radix-ui/themes';

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



function getPalerColor(color: string): string {
  const rgbColor = hexToRgb(color);

  if (rgbColor === null) {
    console.warn(`Invalid hex color: ${color}`);
    return color; 
  }

  const rgbaColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`;
  return rgbaColor;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}


const PokemonPage = async ({ 
  params
}: { 
    params: { slug: string } 
 }) => {
  //console.log('params',params)
  const pokemon = await singlePokemonData(params.slug);
 // const grassColor = getPalerColor(typeColor.grass);
  //console.log('pokemon.types?.[0]?.name)',getPalerColor(typeColor[pokemon.types?.[0]?.name]))
 // console.log('grassColor',grassColor);

 
  return (
    <>
    {
      pokemon === null || pokemon === undefined  ? (
        <>
         <div 
         //className='flex items-center justify-center h-dvh'
         >
        <Spinner size="3"/>
      </div>
        </>
      ) : (
        <>
        <ClientLink />
  
     <div className="flex items-center justify-center h-screen " 
     
     style={{ backgroundColor: `${getPalerColor(typeColor[pokemon?.types?.[0]?.name])}` }} 
     >
<div className="border-gray-300 border flex flex-col pr-5 pl-5 mx-auto w-[400px]  py-6 bg-white overflow-hidden rounded-2xl	">
    <h1 className=" text-2xl font-bold mb-2 capitalize">{pokemon?.name}</h1>
     <Image 
     width={100}
      height={100}
     className="self-end block w-3/5 h-64 object-contain mb-6" 
     src={pokemon.imageUrl} 
     alt={pokemon.name} 
     /> 

    <h2 className="text-xl font-bold mb-2">Stats</h2>
    <ul className="mb-4">
      {pokemon?.stats?.map((stat) => (
        <li key={stat?.name} className="text-gray-700 text-sm">
          <strong className='capitalize'>{stat?.name}:</strong> {stat?.value}
        </li>
      ))}
    </ul>

    <h2 className="text-xl font-bold mb-2">Abilities</h2>
    <ul>
      {pokemon?.abilities?.map((ability) => (
        <li key={ability?.name}
        style={{backgroundColor: typeColor[pokemon?.types?.[0]?.name]}}
        className="inline-block rounded-full px-3 py-1 text-sm mr-2 mb-2">
          <h3 className="font-semibold text-white	capitalize">{ability?.name}</h3>
        </li>
      ))}
    </ul>
  </div>
</div>
        </>
      )
    }
   
      
     
    </>
  )
}

export default PokemonPage